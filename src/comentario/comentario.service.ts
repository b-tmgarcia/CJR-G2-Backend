import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateComentarioDto} from './dto/create-comentario.dto';
import {UpdateComentarioDto} from './dto/update-comentario.dto';

@Injectable()
export class ComentarioService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateComentarioDto) {
    return this.prisma.comentario.create({ data: dto });
  }

  findAll() {
    return this.prisma.comentario.findMany();
  }

  findOne(id: number) {
    return this.prisma.comentario.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateComentarioDto) {
    return this.prisma.comentario.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.comentario.delete({ where: { id } });
  }
}
