import fs from "fs/promises";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transporter } from "../config/mailer.config.js";

const ALLOWED_MIME_TYPES = new Set([
	"image/jpeg",
	"image/png",
	"image/jpg",
	"application/pdf"
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const MEMBERSHIP_TYPES = new Set(["lifetime", "annual", "associate"]);

const normalizePhone = (value) => value.replace(/\D/g, "");

const validateFiles = (files, membershipType) => {
	const errors = {};
	const requiredFields = ["paymentReceipt", "degreeCertificate", "passportPhoto"];

	for (const field of requiredFields) {
		if (!files?.[field]?.[0]) {
			errors[field] = "Required file missing";
		}
	}

	if (membershipType === "lifetime" && !files?.recommendationLetter?.[0]) {
		errors.recommendationLetter = "Required for lifetime membership";
	}

	const allFiles = Object.values(files || {}).flat();
	for (const file of allFiles) {
		if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
			errors[file.fieldname] = "Invalid file type";
		}
		if (file.size > MAX_FILE_SIZE_BYTES) {
			errors[file.fieldname] = "File size exceeds 5MB";
		}
	}

	return errors;
};

const buildEmailHtml = (payload) => {
	const rows = Object.entries(payload)
		.map(
			([label, value]) =>
				`<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">${label}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${value || "-"}</td></tr>`
		)
		.join("");

	return `
		<div style="font-family:Arial,Helvetica,sans-serif;color:#111827;">
			<h2 style="margin:0 0 16px;">New Membership Application</h2>
			<table style="border-collapse:collapse;width:100%;">${rows}</table>
			<p style="margin-top:16px;color:#6b7280;font-size:12px;">Attachments include all submitted documents.</p>
		</div>
	`;
};

const buildApplicantEmailHtml = ({ fullName, membershipType, paymentRef }) => {
	return `
		<div style="font-family:Arial,Helvetica,sans-serif;color:#111827;">
			<h2 style="margin:0 0 12px;">We received your membership request</h2>
			<p style="margin:0 0 12px;">Hello ${fullName || "Applicant"},</p>
			<p style="margin:0 0 12px;">Thank you for submitting your ACPM membership application. Our team has successfully received your request and will reply shortly after verification.</p>
			<table style="border-collapse:collapse;width:100%;max-width:480px;">
				<tr>
					<td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">Membership Type</td>
					<td style="padding:8px 12px;border:1px solid #e5e7eb;">${membershipType || "-"}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">Payment Reference</td>
					<td style="padding:8px 12px;border:1px solid #e5e7eb;">${paymentRef || "-"}</td>
				</tr>
			</table>
			<p style="margin-top:12px;color:#6b7280;font-size:12px;">If you have questions, reply to this email.</p>
		</div>
	`;
};

const cleanupFiles = async (files = []) => {
	await Promise.all(
		files.map((file) => fs.unlink(file.path).catch(() => null))
	);
};

export const applyMembership = asyncHandler(async (req, res) => {
	const {
		fullName,
		email,
		phone,
		dob,
		qualification,
		organization,
		membershipType,
		paymentRef
	} = req.body;

	const validationErrors = {};
	if (!fullName?.trim()) validationErrors.fullName = "Full name is required";
	if (!email?.trim()) validationErrors.email = "Email is required";
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		validationErrors.email = "Invalid email format";
	}

	const normalizedPhone = normalizePhone(phone || "");
	if (!normalizedPhone) validationErrors.phone = "Phone number is required";
	if (normalizedPhone && normalizedPhone.length !== 10) {
		validationErrors.phone = "Enter valid 10-digit phone";
	}

	if (!dob) validationErrors.dob = "Date of birth is required";
	if (!qualification?.trim()) validationErrors.qualification = "Qualification is required";
	if (!organization?.trim()) validationErrors.organization = "Organization is required";
	if (!membershipType || !MEMBERSHIP_TYPES.has(membershipType)) {
		validationErrors.membershipType = "Invalid membership type";
	}
	if (!paymentRef?.trim()) validationErrors.paymentRef = "Payment reference is required";

	const fileErrors = validateFiles(req.files, membershipType);
	Object.assign(validationErrors, fileErrors);

	if (Object.keys(validationErrors).length > 0) {
		await cleanupFiles(Object.values(req.files || {}).flat());
		return res
			.status(400)
			.json(new ApiResponse(400, { errors: validationErrors }, "Validation failed"));
	}

	const attachments = Object.values(req.files || {})
		.flat()
		.map((file) => ({
			filename: file.originalname,
			path: file.path
		}));

	const payload = {
		"Full Name": fullName,
		"Email": email,
		"Phone": normalizedPhone,
		"Date of Birth": dob,
		"Qualification": qualification,
		"Organization": organization,
		"Membership Type": membershipType,
		"Payment Reference": paymentRef
	};

	const html = buildEmailHtml(payload);
	const text = Object.entries(payload)
		.map(([label, value]) => `${label}: ${value || "-"}`)
		.join("\n");
	const applicantText = `Hello ${fullName || "Applicant"},\n\nWe have successfully received your ACPM membership request. Our team will verify your submission and reply shortly.\n\nMembership Type: ${membershipType || "-"}\nPayment Reference: ${paymentRef || "-"}\n\nIf you have any questions, reply to this email.`;
	const applicantHtml = buildApplicantEmailHtml({ fullName, membershipType, paymentRef });

	const toAddress = process.env.MEMBERSHIP_RECEIVER_EMAIL || process.env.EMAIL_USER;
	if (!toAddress) {
		await cleanupFiles(Object.values(req.files || {}).flat());
		throw new ApiError(500, "Email receiver is not configured");
	}

	try {
		await transporter.sendMail({
			from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
			to: toAddress,
			subject: `New Membership Application - ${fullName} (${membershipType})`,
			text,
			html,
			attachments
		});

		await transporter.sendMail({
			from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
			to: email,
			subject: "We received your ACPM membership request",
			text: applicantText,
			html: applicantHtml
		});
	} finally {
		await cleanupFiles(Object.values(req.files || {}).flat());
	}

	return res
		.status(200)
		.json(new ApiResponse(200, { paymentRef }, "Application submitted"));
});