import { Module } from '@nestjs/common';
import { AvaliacoesProdutoService } from './avaliacoes-produto.service';
import { AvaliacoesProdutoController } from './avaliacoes-produto.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [AvaliacoesProdutoController],
  providers: [AvaliacoesProdutoService],
})
export class AvaliacoesProdutoModule {}