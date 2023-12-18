/*
  Warnings:

  - You are about to drop the column `quality` on the `foodrecomingredient` table. All the data in the column will be lost.
  - Added the required column `qty` to the `FoodRecomIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FoodRecomIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FoodRecomInstruction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NutritionInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `FoodRecomIngredient_ingredient_quality_idx` ON `foodrecomingredient`;

-- AlterTable
ALTER TABLE `foodrecomingredient` DROP COLUMN `quality`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `qty` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `foodrecominstruction` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `instruction` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `nutritioninfo` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `FoodRecomIngredient_ingredient_idx` ON `FoodRecomIngredient`(`ingredient`);
