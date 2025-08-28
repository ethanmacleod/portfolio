/*
  Warnings:

  - You are about to drop the `news_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "news_tags" DROP CONSTRAINT "news_tags_newsId_fkey";

-- DropForeignKey
ALTER TABLE "news_tags" DROP CONSTRAINT "news_tags_tagId_fkey";

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "author" DROP NOT NULL;

-- DropTable
DROP TABLE "news_tags";

-- CreateTable
CREATE TABLE "_NewsToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NewsToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NewsToTag_B_index" ON "_NewsToTag"("B");

-- AddForeignKey
ALTER TABLE "_NewsToTag" ADD CONSTRAINT "_NewsToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToTag" ADD CONSTRAINT "_NewsToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
