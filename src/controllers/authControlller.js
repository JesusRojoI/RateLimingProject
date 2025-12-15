import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const showLogin = (req, res) => {
    res.render("login");
};

export const showRegister = (req, res) => {
    res.render("register");
};

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        }
    });
    
    res.redirect("/login");
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({
        where: { email }
    });
    
    if (!user) {
        return res.render("login", { error: "Credenciales incorrectas" });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        return res.render("login", { error: "Credenciales incorrectas" });
    }
    
    req.session.userId = user.id;
    req.session.userRole = user.role;
    
    if (user.role === "admin") {
        res.redirect("/admin");
    } else {
        res.redirect("/user");
    }
};

export const userPage = (req, res) => {
    res.render("user");
};

export const logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};