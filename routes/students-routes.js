import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/list", async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.json({ items: students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
