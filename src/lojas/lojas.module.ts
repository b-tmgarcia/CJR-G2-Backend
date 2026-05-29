import { Module } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { LojasController } from './lojas.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],          // ← única mudança
  controllers: [LojasController],
  providers: [LojasService],
})
export class LojasModule {}
