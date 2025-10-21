import { PrismaClient } from '../src/generated/prisma';
import { PokemonTypeService } from '../src/services/PokemonTypeService';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
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
