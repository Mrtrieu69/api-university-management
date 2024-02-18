-- AlterTable
ALTER TABLE "User" ALTER COLUMN "access_token" DROP NOT NULL,
ALTER COLUMN "access_token" DROP DEFAULT;
