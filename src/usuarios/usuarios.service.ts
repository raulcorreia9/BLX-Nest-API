import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuarios> {
    const { email } = createUsuarioDto;
    const busca_email = await this.usuariosRepository.findOne({ email });

    if (busca_email) {
      throw new BadRequestException(
        'Já existe um usuário cadastrado com esse email.'
      );
    }

    const user = await this.usuariosRepository.create({ ...createUsuarioDto });
    return this.usuariosRepository.save(user);
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuarios> {
    const usuario = await this.usuariosRepository.findOne(id);

    if (!usuario) {
      throw new NotFoundException(`Não foi encontrado usuario com ID = #${id}`);
    }

    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuarios> {
    //Preload -> Se não existir usuário, cria, se existir com o ID informado, atualiza os dados
    const user = await this.usuariosRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });

    if (!user) {
      throw new NotFoundException(`Não foi encontrado usuário com ID = ${id}`);
    }

    return this.usuariosRepository.save(user);
  }

  async remove(id: number) {
    const usuario = await this.usuariosRepository.findOne(id);

    if (!usuario) {
      throw new NotFoundException(`Não foi encontrado usuario com ID = #${id}`);
    }

    return this.usuariosRepository.remove(usuario);
  }
}
