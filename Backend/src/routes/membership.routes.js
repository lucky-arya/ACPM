import { Router } from "express";

import { applyMembership } from "../controllers/membership.contoller.js";
import { honeypotCheck } from "../middlewares/botcheck.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { membershipLimiter } from "../middlewares/rateLimit.middlewares.js";

const router = Router();

router.post(
  "/membership/apply",
  membershipLimiter,
  upload.fields([
    { name: "paymentReceipt", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "recommendationLetter", maxCount: 1 }
  ]),
  honeypotCheck,
  applyMembership
);

export default router;
