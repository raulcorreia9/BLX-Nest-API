import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsBoolean()
  disponivel: boolean;

  @IsOptional()
  @IsNumber()
  usuarioId: Usuarios;
}
