import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtosRepository: Repository<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto, usuarioId: any) {
    createProdutoDto.usuarioId = usuarioId.id;
    const produto = await this.produtosRepository.create({
      ...createProdutoDto,
    });

    return this.produtosRepository.save(produto);
  }

  async findAll() {
    return this.produtosRepository.find();
  }

  async findOne(id: number) {
    const produto = await this.produtosRepository.findOne(id);

    if (!produto) {
      throw new NotFoundException(`Não foi encontrado produto com ID = ${id}`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.produtosRepository.preload({
      id: id,
      ...updateProdutoDto,
    });

    if (!produto) {
      throw new NotFoundException(`Não foi encontrado produto com ID = ${id}`);
    }

    return this.produtosRepository.save(produto);
  }

  async remove(id: number) {
    const produto = await this.produtosRepository.findOne(id);

    if (!produto) {
      throw new NotFoundException(`Não foi encontrado produto com ID = ${id}`);
    }

    return this.produtosRepository.remove(produto);
  }
}
