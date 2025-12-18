import express from "express";
import session from "express-session";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();
const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: false,
cookie: { httpOnly: true, sameSite: "strict" }
}));
// Configuración del Rate Limiter
const loginLimiter = rateLimit({
windowMs: 5 * 60 * 1000, // 5 minutos
max: 5, // máximo 5 intentos
message: "Demasiados intentos fallidos. Intenta de nuevo en 5 minutos.",
standardHeaders: true,
legacyHeaders: false
});
app.use("/login", loginLimiter);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));
app.use("/", authRoutes);
app.use("/admin", adminRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));