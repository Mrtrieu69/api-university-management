import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../middleware/authorization.js";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const { username, password, type } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (user) return res.status(401).json({ error: "Пользователь уже существует." });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                type,
            },
        });

        res.json({ user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/list", authenticateToken, async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ items: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
