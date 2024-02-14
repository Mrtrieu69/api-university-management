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
        await prisma.user.update({
            where: {
                username,
            },
            data: {
                access_token: tokens.accessToken,
            },
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
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let tokens = jwtTokens(user);
            res.cookie("refresh_token", tokens.refreshToken, {
                ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });

            await prisma.user.update({
                where: {
                    username: user.username,
                },
                data: {
                    access_token: tokens.accessToken,
                },
            });
            return res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default router;
