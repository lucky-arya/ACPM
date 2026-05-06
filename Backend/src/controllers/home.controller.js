import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { transporter } from "../config/mailer.config.js"

const homeRouteHandler = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Welcome to Home Route"
    })
})

export { homeRouteHandler }

const normalizePhone = (value) => value.replace(/\D/g, "");

const buildContactEmailHtml = (payload) => {
    const rows = Object.entries(payload)
        .map(
            ([label, value]) =>
                `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">${label}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${value || "-"}</td></tr>`
        )
        .join("");

    return `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;">
            <h2 style="margin:0 0 16px;">New Contact Message</h2>
            <table style="border-collapse:collapse;width:100%;">${rows}</table>
        </div>
    `;
};

const buildContactAckHtml = ({ name, subject }) => {
    return `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;">
            <h2 style="margin:0 0 12px;">We received your message</h2>
            <p style="margin:0 0 12px;">Hello ${name || "there"},</p>
            <p style="margin:0 0 12px;">Thank you for contacting ACPM. Our team has received your message and will reply shortly.</p>
            <p style="margin:0;color:#6b7280;font-size:12px;">Subject: ${subject || "-"}</p>
        </div>
    `;
};

const sendContactMessage = asyncHandler(async (req, res) => {
    const { name, email, phone, subject, message, source } = req.body;

    const validationErrors = {};
    if (!name?.trim()) validationErrors.name = "Name is required";
    if (!email?.trim()) validationErrors.email = "Email is required";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validationErrors.email = "Invalid email format";
    }
    if (!subject?.trim()) validationErrors.subject = "Subject is required";
    if (!message?.trim()) validationErrors.message = "Message is required";

    let normalizedPhone = "";
    if (phone) {
        normalizedPhone = normalizePhone(phone);
        if (normalizedPhone.length !== 10) {
            validationErrors.phone = "Enter valid 10-digit phone";
        }
    }

    if (Object.keys(validationErrors).length > 0) {
        return res
            .status(400)
            .json(new ApiResponse(400, { errors: validationErrors }, "Validation failed"));
    }

    const payload = {
        "Name": name,
        "Email": email,
        "Phone": normalizedPhone || "-",
        "Subject": subject,
        "Message": message,
        "Source": source || "unknown"
    };

    const html = buildContactEmailHtml(payload);
    const text = Object.entries(payload)
        .map(([label, value]) => `${label}: ${value || "-"}`)
        .join("\n");

    const toAddress = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER;
    if (!toAddress) {
        throw new ApiError(500, "Email receiver is not configured");
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: toAddress,
        subject: `Contact Message - ${subject}`,
        text,
        html,
        replyTo: email
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: "We received your message",
        text: `Hello ${name || "there"},\n\nThank you for contacting ACPM. Our team has received your message and will reply shortly.\n\nSubject: ${subject || "-"}`,
        html: buildContactAckHtml({ name, subject })
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Message sent"));
});

export { sendContactMessage }