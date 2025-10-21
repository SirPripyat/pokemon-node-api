-- CreateTable
CREATE TABLE "type_relations" (
    "id" TEXT NOT NULL,
    "defenderTypeId" TEXT NOT NULL,
    "attackerTypeId" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "type_relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "type_relations_defenderTypeId_attackerTypeId_key" ON "type_relations"("defenderTypeId", "attackerTypeId");

-- AddForeignKey
ALTER TABLE "type_relations" ADD CONSTRAINT "type_relations_defenderTypeId_fkey" FOREIGN KEY ("defenderTypeId") REFERENCES "pokemon_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_relations" ADD CONSTRAINT "type_relations_attackerTypeId_fkey" FOREIGN KEY ("attackerTypeId") REFERENCES "pokemon_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
