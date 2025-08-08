import { PrismaClient } from '@prisma/client';
import * as fs from 'fs-extra';

const prisma = new PrismaClient();

async function main() {
  const products = await fs.readJson('./src/data/productos.json');

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Productos cargados en la base de datos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
