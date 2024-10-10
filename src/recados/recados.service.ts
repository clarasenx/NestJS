import { Body, HttpException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { Recado } from './entities/recados.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: "Recado de teste",
        de: "Zeca",
      para: "Roberto",
      lido: false,
      data: new Date(),
    },
  ]

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado') 
  }

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    const recado = this.recados.find(item => item.id === +id)

    if(recado) return recado;

    this.throwNotFoundError();
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado = {
      id,
      ...body
    }
    this.recados.push(novoRecado);

    if(novoRecado) return novoRecado;
  }

  update(id: string, body:any) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id === +id)

    if(recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    if(recadoExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadoExistenteIndex];

      this.recados[recadoExistenteIndex] = {
        id,
        ...recadoExistente,
        ...body,
      }
    }
    const recado = this.recados[ recadoExistenteIndex ]
    return recado;
  }

  remove(id: string) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id === +id)

    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const recado = this.recados[recadoExistenteIndex]

    this.recados.splice(recadoExistenteIndex, 1)
    
    return recado;
  }
}
