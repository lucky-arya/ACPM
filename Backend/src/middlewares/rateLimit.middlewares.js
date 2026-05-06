import rateLimit from "express-rate-limit";

import { ApiResponse } from "../utils/ApiResponse.js";

const membershipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: new ApiResponse(
    429,
    null,
    "Too many membership requests. Please try again later."
  )
});

export { membershipLimiter };
