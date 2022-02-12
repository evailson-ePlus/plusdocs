/*
  Warnings:

  - You are about to drop the column `documentation` on the `Component` table. All the data in the column will be lost.
  - Added the required column `readme` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" DROP COLUMN "documentation",
ADD COLUMN     "readme" TEXT NOT NULL;
