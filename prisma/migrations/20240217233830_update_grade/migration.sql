/*
  Warnings:

  - Added the required column `grade` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "grade" INTEGER NOT NULL;
