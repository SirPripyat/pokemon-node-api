-- CreateTable
CREATE TABLE "pokemon_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pokemon_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_on_types" (
    "pokemonId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pokemon_on_types_pkey" PRIMARY KEY ("pokemonId","typeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_types_name_key" ON "pokemon_types"("name");

-- AddForeignKey
ALTER TABLE "pokemon_on_types" ADD CONSTRAINT "pokemon_on_types_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_on_types" ADD CONSTRAINT "pokemon_on_types_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "pokemon_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
