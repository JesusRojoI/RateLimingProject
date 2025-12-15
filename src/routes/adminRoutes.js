import express from "express";
import { adminPage, listUsers } from "../controllers/adminController.js";

const router = express.Router();

const isAdmin = (req, res, next) => {
    if (req.session.userRole === "admin") {
        return next();
    }
    res.status(403).send("Acceso denegado");
};

router.get("/", isAdmin, adminPage);
router.get("/users", isAdmin, listUsers);

export default router;