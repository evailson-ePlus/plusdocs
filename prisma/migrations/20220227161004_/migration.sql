-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComponentsOnStores" (
    "componentId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "ComponentsOnStores_pkey" PRIMARY KEY ("componentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_repoId_key" ON "Store"("repoId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentsOnStores" ADD CONSTRAINT "ComponentsOnStores_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentsOnStores" ADD CONSTRAINT "ComponentsOnStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
