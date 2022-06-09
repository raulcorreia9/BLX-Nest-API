import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const pedido = await this.pedidosRepository.create({
      ...createPedidoDto,
    });

    return this.pedidosRepository.save(pedido);
  }

  async findAll() {
    return this.pedidosRepository.find();
  }

  async findOne(id: number) {
    const pedido = await this.pedidosRepository.findOne(id);

    if (!pedido) {
      throw new NotFoundException(`Não foi encontrado pedido com ID = ${id}`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidosRepository.preload({
      id: id,
      ...updatePedidoDto,
    });

    if (!pedido) {
      throw new NotFoundException(`Não foi encontrado pedido com ID = ${id}`);
    }

    return this.pedidosRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.pedidosRepository.findOne(id);

    if (!pedido) {
      throw new NotFoundException(`Não foi encontrado pedido com ID = ${id}`);
    }

    return pedido;
  }
}
