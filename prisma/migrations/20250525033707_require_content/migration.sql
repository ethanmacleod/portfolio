/*
  Warnings:

  - Made the column `content` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "news" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "author" SET NOT NULL;
