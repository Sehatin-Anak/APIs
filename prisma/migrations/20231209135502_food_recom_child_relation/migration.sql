/*
  Warnings:

  - Added the required column `childId` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FoodRecom` ADD COLUMN `childId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `FoodRecom` ADD CONSTRAINT `FoodRecom_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
