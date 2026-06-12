import {Module, Injectable} from '@nestjs/common';
import {ComentarioController} from './comentario.controller';
import {PrismaModule} from '../prisma/prisma.module';

// Local minimal service implementation to avoid missing-module errors
@Injectable()
export class ComentarioService {
  // add methods as needed by the application
  constructor() {}
}

@Module({
  imports: [PrismaModule],
  controllers: [ComentarioController],
  providers: [ComentarioService],
})
export class ComentarioModule {}