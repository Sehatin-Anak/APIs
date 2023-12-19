-- CreateIndex
CREATE FULLTEXT INDEX `Article_title_content_idx` ON `Article`(`title`, `content`);

-- CreateIndex
CREATE FULLTEXT INDEX `NutritionInfo_calories_fat_saturatedFat_cholesterol_sodium_c_idx` ON `NutritionInfo`(`calories`, `fat`, `saturatedFat`, `cholesterol`, `sodium`, `carbohydrates`, `fiber`, `sugar`, `protein`);
