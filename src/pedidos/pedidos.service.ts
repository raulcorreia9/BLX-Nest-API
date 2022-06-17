import { ProdutosService } from './../produtos/produtos.service';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import { Produto } from 'src/produtos/entities/produto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,

    private readonly produtoService: ProdutosService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, usuarioId: any) {
    //Atribui ao DTO o ID do usuário que está logado
    createPedidoDto.usuarioId = usuarioId.id;
    //Pega o array de objetos com os ID's dos produtos do pedido
    const produtos = createPedidoDto.produtos;
    //Array que irá guardar somente os ID's dos produtos
    const produtosId = [];
    //Variavel para guardar o valor do findOne de produtos
    let findProduto;

    for(let i = 0; i < produtos.length; i++) {
      //Guarda os IDs dos produtos de um pedido em um array
      produtosId.push(produtos[i].id);
      //faz um findOne para trazer de volta as info de cada produto
      findProduto = await getRepository(Produto).findOne({ id: produtosId[i]});
      //Verifica se o ID do usuario dono do produto é igual
      //ao id do usuário que esta logado e realizando o pedido
      if(findProduto.usuarioId.id == usuarioId.id) {
        throw new BadRequestException(`Não é possível comprar seus proprios produtos.`)
      }
      // console.log(findProduto.usuarioId.id);
    }
    const pedido = await this.pedidosRepository.create({
      ...createPedidoDto,
    });

    // console.log(produtosId);

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
