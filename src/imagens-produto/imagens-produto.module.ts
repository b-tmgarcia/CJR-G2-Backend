import { Module } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { ImagensProdutoController } from './imagens-produto.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImagensProdutoController],
  providers: [ImagensProdutoService],
})
export class ImagensProdutoModule {}