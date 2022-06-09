import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNumber()
  produtoId: number;
}
