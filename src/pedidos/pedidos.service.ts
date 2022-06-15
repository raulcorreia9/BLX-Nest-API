import { ProdutosService } from './../produtos/produtos.service';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,

    private readonly produtoService: ProdutosService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, usuarioId: any) {
    const produtos = createPedidoDto.produtos;
    const vendedorId = [];
    console.log(produtos);
    const produtosVendedor = [];

    for(let i = 0; i < produtos.length; i++) {
      console.log(produtos[i].id);
      const result = await this.produtoService.findOne(produtos[i].id)
      produtosVendedor.push(result);
      vendedorId.push = produtosVendedor[i].usuarioId.id;
    }

    console.log('Produtos Vendedor = ', produtosVendedor);
    console.log('Vendedor ID = ', vendedorId)

    createPedidoDto.usuarioId = usuarioId.id;
    // const produtosVendedor = await this.produtoService.findOne();

    const pedido = await this.pedidosRepository.create({
      ...createPedidoDto,
    });

    return this.pedidosRepository.save(pedido);
  }

  async findAll() {
    return this.pedidosRepository.find();
  }

  async findComprasUsuario(usuarioId: any) {
    return this.pedidosRepository.find({
      where: {
        usuarioId: usuarioId.id
      }
    });
  }

async findVendasUsuario(usuarioId: any) {
  const usuario = await getRepository(Usuarios).findOne({ id: usuarioId.id });

  if(!usuario) {
    throw new BadRequestException('Bad Request');
  }

  const pedido = await this.pedidosRepository.find({
    join: {
      alias: 'pedido',
      leftJoinAndSelect: {
        produtos: 'pedido.produtos',
        usuarios: 'produtos.usuarioId'
      }
    },
    where: (qb) => {
      qb.where("usuarios.id = :id", {id: usuarioId.id})
    }
  });

  if(!pedido) {
    throw new NotFoundException(`Não foi encontrado pedidos para o usuário de ID = ${usuarioId.id}`);
  }

  return pedido;
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
