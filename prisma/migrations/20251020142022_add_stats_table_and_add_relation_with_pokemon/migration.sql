/*
  Warnings:

  - You are about to drop the column `attack` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `hp` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `special_attack` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `special_defense` on the `pokemons` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `pokemons` table. All the data in the column will be lost.
  - Added the required column `statsId` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "attack",
DROP COLUMN "defense",
DROP COLUMN "hp",
DROP COLUMN "special_attack",
DROP COLUMN "special_defense",
DROP COLUMN "speed",
ADD COLUMN     "statsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "stats" (
    "id" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "special_attack" INTEGER NOT NULL,
    "special_defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "pokemonId" TEXT NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stats_pokemonId_key" ON "stats"("pokemonId");

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
