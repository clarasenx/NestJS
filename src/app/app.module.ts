import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RecadosController } from '../recados/recados.controller';
import { RecadosModule } from '../recados/recados.module';
import { RecadosService } from '../recados/recados.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    RecadosModule,
    PessoasModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      autoLoadEntities: true, //carrega entidades sem precisar especifica-las
      synchronize: true, //sincroniza com o BD. NÃO DEVE SER USADO EM PRODUÇÃO
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
