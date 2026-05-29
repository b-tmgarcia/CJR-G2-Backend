import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvaliacaoLojaDto } from './dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from './dto/update-avaliacao-loja.dto';

@Injectable()
export class AvaliacoesLojaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAvaliacaoLojaDto) {
    return this.prisma.avaliacoes_loja.create({ data: dto });
  }

  async findAll() {
    return this.prisma.avaliacoes_loja.findMany({
      include: {
        usuario: { select: { id: true, nome: true } },
        loja: { select: { id: true, nome: true } },
      },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.avaliacoes_loja.findUnique({
      where: { id },
      include: {
        usuario: { select: { id: true, nome: true } },
        loja: { select: { id: true, nome: true } },
        comentarios_avaliacao: true,
      },
    });

    if (!avaliacao) throw new NotFoundException(`Avaliação ${id} não encontrada`);
    return avaliacao;
  }

  async update(id: number, dto: UpdateAvaliacaoLojaDto) {
    await this.findOne(id);
    return this.prisma.avaliacoes_loja.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.avaliacoes_loja.delete({ where: { id } });
  }
}
