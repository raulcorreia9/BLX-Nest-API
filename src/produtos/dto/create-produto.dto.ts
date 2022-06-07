import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  usuarioId?: number;
}
