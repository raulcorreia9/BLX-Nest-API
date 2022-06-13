import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';

export class CreatePedidoDto {
  @IsBoolean()
  entrega: boolean;

  @IsNumber()
  quantidade: number;

  @IsNumber()
  numeroCasa: number;

  @IsString()
  rua: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsOptional()
  produtos: Produto[];

  @IsOptional()
  @IsNumber()
  usuarioId: Usuarios;
}
