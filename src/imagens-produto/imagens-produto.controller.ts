import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { CreateImagemProdutoDto } from './dto/create-imagem-produto.dto';
import { UpdateImagemProdutoDto } from './dto/update-imagem-produto.dto';

@Controller('imagens-produto')
export class ImagensProdutoController {
  constructor(private readonly imagensProdutoService: ImagensProdutoService) {}

  @Post()
  create(@Body() dto: CreateImagemProdutoDto) {
    return this.imagensProdutoService.create(dto);
  }

  @Get()
  findAll() {
    return this.imagensProdutoService.findAll();
  }

  @Get('produto/:produto_id')
  findByProduto(@Param('produto_id', ParseIntPipe) produto_id: number) {
    return this.imagensProdutoService.findByProduto(produto_id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imagensProdutoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateImagemProdutoDto,
  ) {
    return this.imagensProdutoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imagensProdutoService.remove(id);
  }
}