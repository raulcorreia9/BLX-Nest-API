import { SigninDto } from './dto/signin-usuario.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
    
    private readonly authService: AuthService,
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

  async signin(signDto: SigninDto) {
    const user = await this.usuariosRepository.findOne({ where: {email: signDto.email },
      select: ['id', 'email', 'nome', 'senha']
    });
    
    if(!user) {
      throw new NotFoundException('Email não cadastrado.');
    }
    
    const match = await this.checkPassword(signDto.senha, user);
    

    if(!match) {
      throw new NotFoundException('Senha incorreta.');
    }

    const jwToken = await this.authService.criaToken(user.id);

    return { nome:user.nome, email: user.email, jwToken };
  }

  async findByEmail(email: string): Promise<Usuarios> {
    const user = this.usuariosRepository.findOne({ email });

    if(!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto,): Promise<Usuarios> {  
    
    if(updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha,  Number(process.env.HASH_SALT));
    }
    
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

  private async checkPassword(password: string, user: Usuarios): Promise<boolean> {
    const match = await bcrypt.compare(password, user.senha);
    if(!match) {
        throw new NotFoundException('Password not found.')
    }

    return match;
  }
}
