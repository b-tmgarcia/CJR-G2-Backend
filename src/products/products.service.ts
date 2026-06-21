import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    if (!createProductDto.loja_id || !createProductDto.categoria_id) {
      throw new Error("Loja e Categoria são obrigatórias para criar um produto.");
    }

    return this.prisma.produtos.create({
      data: {
        nome: createProductDto.nome,
        descricao: createProductDto.descricao,
        preco: createProductDto.preco,
        estoque: createProductDto.estoque,
        loja: {
          connect: { id: createProductDto.loja_id },
        },
        categoria: {
          connect: { id: createProductDto.categoria_id },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.produtos.findMany({
      include: {
        loja: true,
        categoria: true,
      },
    });
  }

  async findOne(id: number) {
    const produto = await this.prisma.produtos.findUnique({
      where: { id },
      include: {
        loja: true,
        categoria: true,
        imagens_produto: true,
        avaliacoes_produto: true,
      },
    });

    if (!produto) {
      throw new NotFoundException(
        `Produto com id ${id} não encontrado`,
      );
    }

    return produto;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.produtos.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.produtos.delete({
      where: { id },
    });
  }
}