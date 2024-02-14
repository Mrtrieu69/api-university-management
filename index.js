import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter, usersRouter } from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);

app.listen(PORT, () => console.log(`Serve is listening on ${PORT}`));
