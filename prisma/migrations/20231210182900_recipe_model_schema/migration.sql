-- CreateTable
CREATE TABLE `Recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `recipeCategory` VARCHAR(191) NOT NULL,
    `agregateRating` DOUBLE NOT NULL,
    `reviewCount` INTEGER NOT NULL,
    `foodRecomId` INTEGER NOT NULL,
    `nutritionInfoId` INTEGER NOT NULL,

    UNIQUE INDEX `Recipe_nutritionInfoId_key`(`nutritionInfoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NutritionInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `calories` VARCHAR(191) NOT NULL,
    `fat` VARCHAR(191) NOT NULL,
    `saturatedFat` VARCHAR(191) NOT NULL,
    `cholesterol` VARCHAR(191) NOT NULL,
    `sodium` VARCHAR(191) NOT NULL,
    `carbohydrates` VARCHAR(191) NOT NULL,
    `fiber` VARCHAR(191) NOT NULL,
    `sugar` VARCHAR(191) NOT NULL,
    `protein` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient` VARCHAR(191) NOT NULL,
    `quality` VARCHAR(1000) NOT NULL,
    `recipeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `ingredient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeInstruction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stepOrder` INTEGER NOT NULL,
    `instruction` VARCHAR(191) NOT NULL,
    `recipeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `stepOrder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_foodRecomId_fkey` FOREIGN KEY (`foodRecomId`) REFERENCES `FoodRecom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_nutritionInfoId_fkey` FOREIGN KEY (`nutritionInfoId`) REFERENCES `NutritionInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredient` ADD CONSTRAINT `RecipeIngredient_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeInstruction` ADD CONSTRAINT `RecipeInstruction_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
