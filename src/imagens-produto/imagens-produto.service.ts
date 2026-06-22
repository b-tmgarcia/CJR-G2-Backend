import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImagemProdutoDto } from './dto/create-imagem-produto.dto';
import { UpdateImagemProdutoDto } from './dto/update-imagem-produto.dto';

@Injectable()
export class ImagensProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateImagemProdutoDto) {
    return this.prisma.imagens_produto.create({ data: dto });
  }

  async findAll() {
    return this.prisma.imagens_produto.findMany({
      orderBy: { ordem: 'asc' },
    });
  }

  async findByProduto(produto_id: number) {
    return this.prisma.imagens_produto.findMany({
      where: { produto_id },
      orderBy: { ordem: 'asc' },
    });
  }

  async findOne(id: number) {
    const imagem = await this.prisma.imagens_produto.findUnique({
      where: { id },
    });

    if (!imagem) {
      throw new NotFoundException(`Imagem #${id} não encontrada`);
    }

    return imagem;
  }

  async update(id: number, dto: UpdateImagemProdutoDto) {
    await this.findOne(id);

    return this.prisma.imagens_produto.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.imagens_produto.delete({
      where: { id },
    });
  }
}