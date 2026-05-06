import { ApiResponse } from "../utils/ApiResponse.js";

const honeypotCheck = (req, res, next) => {
  const honeypotValue = req.body?.website || req.body?.company || "";
  if (String(honeypotValue).trim().length > 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid submission"));
  }
  return next();
};

export { honeypotCheck };
