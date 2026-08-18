import rateLimit from "express-rate-limit";

/**
 * Strict limiter for authentication endpoints.
 * Prevents brute-forcing / hammering Google token verification.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many attempts. Please try again later.",
    },
});

/**
 * Strict limiter for resume uploads (PDF parsing + Gemini API calls
 * are expensive — protect against abuse driving up API costs).
 */
export const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many upload attempts. Please try again later.",
    },
});

/**
 * General limiter applied to all API traffic as a baseline safety net.
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please slow down.",
    },
});