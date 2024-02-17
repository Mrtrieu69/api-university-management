/*
  Warnings:

  - Added the required column `code` to the `Programm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programm" ADD COLUMN     "code" TEXT NOT NULL;
