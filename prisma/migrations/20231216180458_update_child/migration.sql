/*
  Warnings:

  - You are about to drop the column `gender` on the `child` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Child` DROP COLUMN `gender`,
    ADD COLUMN `tall` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `weight` INTEGER NOT NULL DEFAULT 20;
