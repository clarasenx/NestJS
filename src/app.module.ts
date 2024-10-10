import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosController } from './recados/recados.controller';
import { RecadosModule } from './recados/recados.module';
import { RecadosService } from './recados/recados.service';

@Module({
  imports: [RecadosModule],
  controllers: [AppController, RecadosController],
  providers: [AppService, RecadosService],
})
export class AppModule {}
