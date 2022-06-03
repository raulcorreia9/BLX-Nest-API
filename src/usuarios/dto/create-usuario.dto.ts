/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()  
  @IsNotEmpty()
  @MinLength(4)
  senha: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
