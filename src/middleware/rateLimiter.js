import rateLimit from "express-rate-limit";
export const loginLimiter = rateLimit({
windowMs: 5 * 60 * 1000,
max: 5,
message: "Demasiados intentos fallidos. Intenta de nuevo en 5 minutos.",
standardHeaders: true,
legacyHeaders: false,
});