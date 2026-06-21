import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AvaliacoesLojaModule } from './avaliacoes-loja/avaliacoes-loja.module';
import { AvaliacoesProdutoModule } from './avaliacoes-produto/avaliacoes-produto.module';
import { LojasModule } from './lojas/lojas.module';
import { ImagensProdutoModule } from './imagens-produto/imagens-produto.module';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AvaliacoesLojaModule,
    AvaliacoesProdutoModule,
    LojasModule,
    ImagensProdutoModule,
    ProductsModule,
    UploadModule,
    CategoriaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //  provide: APP_GUARD,
    //  useClass: AuthGuard,
    //},
  ],
})
export class AppModule {}