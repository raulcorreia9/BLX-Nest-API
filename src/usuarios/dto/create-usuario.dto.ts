import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { Unique } from 'typeorm';
import { Usuarios } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
