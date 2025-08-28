/*
  Warnings:

  - You are about to drop the `_NewsToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `analytics_summary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `news` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visitors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NewsToTag" DROP CONSTRAINT "_NewsToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToTag" DROP CONSTRAINT "_NewsToTag_B_fkey";

-- DropTable
DROP TABLE "_NewsToTag";

-- DropTable
DROP TABLE "analytics_summary";

-- DropTable
DROP TABLE "news";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "visitors";
