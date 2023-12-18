/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);
