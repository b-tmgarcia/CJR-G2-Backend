import { Module } from '@nestjs/common';
import { AvaliacoesLojaService } from './avaliacoes-loja.service';
import { AvaliacoesLojaController } from './avaliacoes-loja.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AvaliacoesLojaController],
  providers: [AvaliacoesLojaService],
})
export class AvaliacoesLojaModule {}
