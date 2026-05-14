import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.produtos.create({
      data,
    });
  }

  findAll() {
    return this.prisma.produtos.findMany();
  }

  findOne(id: number) {
    return this.prisma.produtos.findUnique({
      where: { id },
    });
  }

  update(id: number, data: any) {
    return this.prisma.produtos.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.produtos.delete({
      where: { id },
    });
  }
}