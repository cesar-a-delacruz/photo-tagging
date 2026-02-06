/*
  Warnings:

  - You are about to alter the column `record` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Json` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "record" SET DATA TYPE VARCHAR(8);
