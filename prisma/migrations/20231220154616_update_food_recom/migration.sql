/*
  Warnings:

  - You are about to drop the column `ageCategoryId` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the `Fruit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeInstruction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Snack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vegetable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ageCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Child` DROP FOREIGN KEY `Child_ageCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Child` DROP FOREIGN KEY `Child_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Fruit` DROP FOREIGN KEY `Fruit_foodRecomId_fkey`;

-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_foodRecomId_fkey`;

-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_nutritionInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeIngredient` DROP FOREIGN KEY `RecipeIngredient_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeInstruction` DROP FOREIGN KEY `RecipeInstruction_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `Snack` DROP FOREIGN KEY `Snack_foodRecomId_fkey`;

-- DropForeignKey
ALTER TABLE `Vegetable` DROP FOREIGN KEY `Vegetable_foodRecomId_fkey`;

-- AlterTable
ALTER TABLE `Child` DROP COLUMN `ageCategoryId`,
    ADD COLUMN `ageCategory` INTEGER NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `FoodRecom` MODIFY `img` VARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE `Fruit`;

-- DropTable
DROP TABLE `Recipe`;

-- DropTable
DROP TABLE `RecipeIngredient`;

-- DropTable
DROP TABLE `RecipeInstruction`;

-- DropTable
DROP TABLE `Snack`;

-- DropTable
DROP TABLE `Vegetable`;

-- DropTable
DROP TABLE `ageCategory`;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
