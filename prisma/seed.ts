import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categorias = ["Eletrônicos", "Roupas", "Alimentos", "Acessórios", "Outros"];

  for (let i = 0; i < categorias.length; i++) {
    await prisma.categorias.upsert({
      where: { id: i + 1 },
      update: {},
      create: { id: i + 1, nome: categorias[i] },
    });
  }

  console.log("Categorias criadas!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());