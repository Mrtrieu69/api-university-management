import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const grades = await prisma.grade.findMany({
            select: {
                class: {
                    select: {
                        subject: {
                            select: {
                                title: true,
                                duration: true,
                            },
                        },
                        employee: {
                            select: {
                                fullname: true,
                            },
                        },
                        type_control: true,
                    },
                },
                grade: true,
            },
            where: {
                student_id: parseInt(id),
            },
        });

        const gradesMap = grades.map((grade) => ({
            subject_title: grade.class.subject.title,
            subject_duration: grade.class.subject.duration,
            type_control: grade.class.type_control,
            employee_fullname: grade.class.employee.fullname,
            grade: grade.grade,
        }));

        res.json({ items: gradesMap });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
