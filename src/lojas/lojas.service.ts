import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Injectable()
export class LojasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLojaDto: CreateLojaDto) {
    return this.prisma.lojas.create({
      data: createLojaDto,
    });
  }

  async findAll() {
    return this.prisma.lojas.findMany({
      include: {
        usuario: {
          select: { id: true, nome: true, email: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const loja = await this.prisma.lojas.findUnique({
      where: { id },
      include: {
        usuario: { select: { id: true, nome: true, email: true } },
        produtos: true,
        avaliacoes_loja: true,
      },
    });

    if (!loja) {
      throw new NotFoundException(`Loja com id ${id} não encontrada`);
    }

    return loja;
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    await this.findOne(id); // já lança 404 se não existir

    return this.prisma.lojas.update({
      where: { id },
      data: updateLojaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // já lança 404 se não existir

    return this.prisma.lojas.delete({
      where: { id },
    });
  }
}
