import { PrismaClient } from '@prisma/client';
import * as fs from 'fs-extra';
import { join } from 'path';

const prisma = new PrismaClient();
const DATA_PATH = join(__dirname, '../src/data/users.json');

async function main() {
  const users = await fs.readJson(DATA_PATH);

  for (const user of users) {
    // Evita duplicados por email
    const exists = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (exists) continue;

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role || 'user',
        isActive: user.isActive ?? true,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      },
    });
  }

  console.log('✅ Usuarios importados exitosamente.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
