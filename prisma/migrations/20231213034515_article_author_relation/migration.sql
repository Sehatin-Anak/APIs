/*
  Warnings:

  - You are about to drop the column `author` on the `article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Article` DROP COLUMN `author`;

-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE FULLTEXT INDEX `FoodRecomIngredient_ingredient_quality_idx` ON `FoodRecomIngredient`(`ingredient`, `quality`);

-- CreateIndex
CREATE FULLTEXT INDEX `FoodRecomInstruction_instruction_idx` ON `FoodRecomInstruction`(`instruction`);

-- AddForeignKey
ALTER TABLE `Author` ADD CONSTRAINT `Author_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
