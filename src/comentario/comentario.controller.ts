import { Controller, Post, Get, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import axios from 'axios';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly service: ComentarioService) {}

  @Post()
  create(@Body() dto: CreateComentarioDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }   

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateComentarioDto) {
    return this.service.update(id, dto);
  }   

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

