import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsBoolean()
  entrega: boolean;

  @IsNumber()
  numeroCasa: number;

  @IsString()
  rua: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsOptional()
  @IsNumber()
  produtoId: number;
}
