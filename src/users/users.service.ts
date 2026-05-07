import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data) {
    return this.prisma.usuarios.create({
      data,
    });
  }

  findAll() {
    return this.prisma.usuarios.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuarios.findUnique({
      where: { id },
    });
  }

  update(id: number, data) {
    return this.prisma.usuarios.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.usuarios.delete({
      where: { id },
    });
  }
}