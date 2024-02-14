import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtTokens } from "../utils/jwt-helpers.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) return res.status(401).json({ error: "Пользователь не существует." });
        //PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Пароль неправильный." });
        //JWT
        let tokens = jwtTokens(user); //Gets access and refresh tokens
        res.cookie("refresh_token", tokens.refreshToken, {
            ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.get("/refresh_token", (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.sendStatus(401);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let tokens = jwtTokens(user);
            res.cookie("refresh_token", tokens.refreshToken, {
                ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            return res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default router;
