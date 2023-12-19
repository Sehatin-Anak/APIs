/*
  Warnings:

  - You are about to drop the column `year` on the `article` table. All the data in the column will be lost.
  - Added the required column `puclicationDate` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `year`,
    ADD COLUMN `publicationDate` VARCHAR(191) NOT NULL;
