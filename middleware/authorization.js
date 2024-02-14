import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; //Bearer TOKEN
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Null token" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(403).json({ error: error.message });

        const currentUser = await prisma.user.findUnique({
            where: {
                username: user.username,
            },
        });

        if (currentUser.access_token === token) {
            next();
        } else {
            return res.status(401).json({ error: "Unauthorized." });
        }
    });
}

export { authenticateToken };
