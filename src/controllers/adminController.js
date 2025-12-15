import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adminPage = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
        
        res.render("admin", { 
            users: users,
            userEmail: req.session.userEmail
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
};

export const listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error del servidor" });
    }
};