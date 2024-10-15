import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Pessoa não encontrada');
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const dadosPessoa = {
          nome: createPessoaDto.nome,
          passwordHash: createPessoaDto.password,
          email: createPessoaDto.email,
        }
    
        const novaPessoa = this.pessoaRepository.create(dadosPessoa)
        await this.pessoaRepository.save(novaPessoa)
        return novaPessoa;      
    } catch (error) {
      if(error.code === '23505') {
        throw new ConflictException("Email já está cadastrado");
      }
      throw error;
      
    }
  }

  findAll() {
    const pessoas = this.pessoaRepository.find({
      order: {
        id: 'desc',
      }
    })

    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: {
        id,
      },
    });

    if (pessoa) return pessoa;

    this.throwNotFoundError();
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dadosPessoa = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };
    
    const pessoa = await this.pessoaRepository.preload({
      id,
      ...dadosPessoa,
    });

    if (!pessoa) return this.throwNotFoundError();

    await this.pessoaRepository.save(pessoa);
    return pessoa;
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({
      id
    })

    if (!pessoa) {
      this.throwNotFoundError();      
    }

    return this.pessoaRepository.remove(pessoa)
  }
}
