/*
  Warnings:

  - The primary key for the `ComponentsOnStores` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ComponentsOnStores" DROP CONSTRAINT "ComponentsOnStores_pkey",
ADD CONSTRAINT "ComponentsOnStores_pkey" PRIMARY KEY ("componentId", "storeId");
