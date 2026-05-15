import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.usuarios.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Este e-mail já está sendo usado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    return await this.prisma.usuarios.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        nome: createUserDto.nome,
        senha_hash: hashedPassword,
        foto_perfil_url: createUserDto.foto_perfil_url,
      },
    });
  }

  async findAll() {
    return await this.prisma.usuarios.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        nome: true,
        foto_perfil_url: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        nome: true,
        foto_perfil_url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.usuarios.findFirst({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.usuarios.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    const hashedPassword = updateUserDto.senha
      ? await bcrypt.hash(updateUserDto.senha, 10)
      : undefined;

  return await this.prisma.usuarios.update({
    where: { id },
    data: {
      username: updateUserDto.username,
      email: updateUserDto.email,
      nome: updateUserDto.nome,
      foto_perfil_url: updateUserDto.foto_perfil_url,
      senha_hash: hashedPassword ?? user.senha_hash,
    },
    select: {
      id: true,
      username: true,
      email: true,
      nome: true,
      foto_perfil_url: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  }

  async remove(id: number) {
    const user = await this.prisma.usuarios.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return await this.prisma.usuarios.delete({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        nome: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}