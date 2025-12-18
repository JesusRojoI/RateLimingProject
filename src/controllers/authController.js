import bcrypt from "bcrypt";
import prisma from "../prisma.js"; 

export const showLogin = (req, res) => {
    res.render("login");
};

export const showRegister = (req, res) => {
    res.render("register");
};

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Encriptamos contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.render("register", { error: "Error al registrar usuario (quizás el correo ya existe)" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
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
        req.session.userEmail = user.email; 
        
        if (user.role === "admin") {
            res.redirect("/admin");
        } else {
            res.redirect("/user");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
};

export const userPage = (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    res.render("user", { user: req.session }); 
};

export const logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};