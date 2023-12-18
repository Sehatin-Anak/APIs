/*
  Warnings:

  - You are about to drop the column `createdAt` on the `foodrecomingredient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `foodrecomingredient` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `foodrecominstruction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `foodrecominstruction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `nutritioninfo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `nutritioninfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `foodrecomingredient` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `foodrecominstruction` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `nutritioninfo` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
