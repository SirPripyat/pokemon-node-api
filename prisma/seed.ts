import { PrismaClient } from '../src/generated/prisma';
import { allPokemonTypes, getPokemonTypeColor } from '../src/types';
import { PokemonTypeService } from '../src/services/PokemonTypeService';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  for (const typeName of allPokemonTypes) {
    await prisma.pokemonType.upsert({
      where: { name: typeName },
      update: {},
      create: { name: typeName, color: getPokemonTypeColor(typeName) },
    });
    console.log(`✅ Created type: ${typeName}`);
  }

  await new PokemonTypeService().create();

  console.log('✨ Seeding completed!');
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
