import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recados.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

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

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados
  }

  async findOne(id: number) {
    //const recado = this.recados.find(item => item.id === id)
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      }
    })

    if(recado) return recado;

    this.throwNotFoundError();
  }

  create(createRecadoDto: CreateRecadoDto) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    }
    this.recados.push(novoRecado);

    if(novoRecado) return novoRecado;
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recadoExistenteIndex = this.recados.findIndex(item => item.id === id)

    if(recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    if(recadoExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadoExistenteIndex];

      this.recados[recadoExistenteIndex] = {
        id,
        ...recadoExistente,
        ...updateRecadoDto,
      }
    }
    const recado = this.recados[ recadoExistenteIndex ]
    return recado;
  }

  async remove(id: number) {
    // const recadoExistenteIndex = this.recados.findIndex(item => item.id === id)

    // if (recadoExistenteIndex < 0) {
    //   this.throwNotFoundError();
    // }

    // const recado = this.recados[recadoExistenteIndex]

    // this.recados.splice(recadoExistenteIndex, 1)

    const recado = await this.recadoRepository.findOneBy({
      id
    })

    return this.recadoRepository.remove(recado);
  }
}
