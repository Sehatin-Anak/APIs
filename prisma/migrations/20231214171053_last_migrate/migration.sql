/*
  Warnings:

  - You are about to drop the column `qty` on the `foodrecomingredient` table. All the data in the column will be lost.
  - You are about to alter the column `calories` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `fat` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `saturatedFat` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `cholesterol` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `sodium` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `carbohydrates` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `fiber` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `sugar` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `protein` on the `nutritioninfo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- DropIndex
DROP INDEX `NutritionInfo_calories_fat_saturatedFat_cholesterol_sodium_c_idx` ON `NutritionInfo`;

-- AlterTable
ALTER TABLE `FoodRecomIngredient` DROP COLUMN `qty`;

-- AlterTable
ALTER TABLE `NutritionInfo` MODIFY `calories` DOUBLE NOT NULL,
    MODIFY `fat` DOUBLE NOT NULL,
    MODIFY `saturatedFat` DOUBLE NOT NULL,
    MODIFY `cholesterol` DOUBLE NOT NULL,
    MODIFY `sodium` DOUBLE NOT NULL,
    MODIFY `carbohydrates` DOUBLE NOT NULL,
    MODIFY `fiber` DOUBLE NOT NULL,
    MODIFY `sugar` DOUBLE NOT NULL,
    MODIFY `protein` DOUBLE NOT NULL;
