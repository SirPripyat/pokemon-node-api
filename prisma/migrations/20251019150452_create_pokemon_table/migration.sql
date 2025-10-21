-- CreateTable
CREATE TABLE "pokemons" (
    "id" TEXT NOT NULL,
    "index" INTEGER,
    "name" TEXT NOT NULL,
    "pokedexNumber" TEXT NOT NULL,
    "image" TEXT,
    "pokemonTypes" TEXT[],
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "abilities" TEXT[],
    "description" TEXT,
    "hp" INTEGER,
    "attack" INTEGER,
    "defense" INTEGER,
    "special_attack" INTEGER,
    "special_defense" INTEGER,
    "speed" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);
