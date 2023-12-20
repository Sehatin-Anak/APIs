-- DropForeignKey
ALTER TABLE `FoodRecom` DROP FOREIGN KEY `FoodRecom_nutritionInfoId_fkey`;

-- AlterTable
ALTER TABLE `FoodRecom` MODIFY `nutritionInfoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FoodRecom` ADD CONSTRAINT `FoodRecom_nutritionInfoId_fkey` FOREIGN KEY (`nutritionInfoId`) REFERENCES `NutritionInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
