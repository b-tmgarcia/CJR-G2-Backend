import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [UsersModule, ProductsModule],
  providers: [PrismaService],
})
export class AppModule {}