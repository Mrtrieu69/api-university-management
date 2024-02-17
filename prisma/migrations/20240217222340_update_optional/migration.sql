/*
  Warnings:

  - Made the column `type_control` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `limit_students` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schedule` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subject_id` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_id` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type_employee` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class_id` on table `Grade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `student_id` on table `Grade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Programm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `programm_id` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_programm_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_student_id_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "type_control" SET NOT NULL,
ALTER COLUMN "limit_students" SET NOT NULL,
ALTER COLUMN "schedule" SET NOT NULL,
ALTER COLUMN "subject_id" SET NOT NULL,
ALTER COLUMN "employee_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "salary" DROP NOT NULL,
ALTER COLUMN "sex" DROP NOT NULL,
ALTER COLUMN "type_employee" SET NOT NULL;

-- AlterTable
ALTER TABLE "Grade" ALTER COLUMN "class_id" SET NOT NULL,
ALTER COLUMN "student_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Programm" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "sex" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "programm_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "student_id" DROP NOT NULL,
ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_programm_id_fkey" FOREIGN KEY ("programm_id") REFERENCES "Programm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
