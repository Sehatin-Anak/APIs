-- DropIndex
DROP INDEX `FoodRecom_name_description_idx` ON `foodrecom`;

-- CreateIndex
CREATE FULLTEXT INDEX `FoodRecom_name_description_Category_idx` ON `FoodRecom`(`name`, `description`, `Category`);
