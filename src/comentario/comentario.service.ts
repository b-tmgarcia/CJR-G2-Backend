import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateComentarioDto} from './dto/create-comentario.dto';
import {UpdateComentarioDto} from './dto/update-comentario.dto';

@Injectable()
export class ComentarioService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateComentarioDto) {
    return this.prisma.comentarios_avaliacao.create({ data: dto });
  }

  findAll() {
    return this.prisma.comentarios_avaliacao.findMany();
  }

  findOne(id: number) {
    return this.prisma.comentarios_avaliacao.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateComentarioDto) {
    return this.prisma.comentarios_avaliacao.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.comentarios_avaliacao.delete({ where: { id } });
  }
}
