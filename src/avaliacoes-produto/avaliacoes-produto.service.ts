import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvaliacaoProdutoDto } from './dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from './dto/update-avaliacao-produto.dto';

@Injectable()
export class AvaliacoesProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAvaliacaoProdutoDto) {
    return this.prisma.avaliacoes_produto.create({ data: dto });
  }

  async findAll() {
    return this.prisma.avaliacoes_produto.findMany({
      include: {
        usuario: { select: { id: true, nome: true } },
        produto: { select: { id: true, nome: true } },
      },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.avaliacoes_produto.findUnique({
      where: { id },
      include: {
        usuario: { select: { id: true, nome: true } },
        produto: { select: { id: true, nome: true } },
        comentarios_avaliacao: true,
      },
    });

    if (!avaliacao) throw new NotFoundException(`Avaliação ${id} não encontrada`);
    return avaliacao;
  }

  async update(id: number, dto: UpdateAvaliacaoProdutoDto) {
    await this.findOne(id);
    return this.prisma.avaliacoes_produto.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.avaliacoes_produto.delete({ where: { id } });
  }
}