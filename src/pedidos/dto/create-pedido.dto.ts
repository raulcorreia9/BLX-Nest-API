import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Produto } from 'src/produtos/entities/produto.entity';

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
}
