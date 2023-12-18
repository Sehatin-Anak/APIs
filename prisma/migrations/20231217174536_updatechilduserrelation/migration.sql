/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Child` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Child_userId_key` ON `Child`(`userId`);
