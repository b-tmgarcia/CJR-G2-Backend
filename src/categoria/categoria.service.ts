import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categorias.create({
      data: createCategoriaDto,
    });
  }

  async findAll() {
    return this.prisma.categorias.findMany({
      include: {
        subcategorias: true,
      },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categorias.findUnique({
      where: { id },
      include: {
        subcategorias: true,
        categoria_pai: true,
        produtos: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria com id ${id} não encontrada`,
      );
    }

    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    await this.findOne(id);

    return this.prisma.categorias.update({
      where: { id },
      data: updateCategoriaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.categorias.delete({
      where: { id },
    });
  }
}