-- CreateTable
CREATE TABLE `ageCategory` (
    `ageCategoryId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`ageCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Child` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ageCategoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Child_tokenId_key`(`tokenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_ageCategoryId_fkey` FOREIGN KEY (`ageCategoryId`) REFERENCES `ageCategory`(`ageCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
