/*
  Warnings:

  - You are about to drop the column `ageCategoryId` on the `child` table. All the data in the column will be lost.
  - You are about to drop the `agecategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ageCategory` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `child` DROP FOREIGN KEY `Child_ageCategoryId_fkey`;

-- AlterTable
ALTER TABLE `child` DROP COLUMN `ageCategoryId`,
    ADD COLUMN `ageCategory` INTEGER NOT NULL;

-- DropTable
DROP TABLE `agecategory`;
