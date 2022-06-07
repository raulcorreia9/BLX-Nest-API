import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req: any, @Body() createProdutoDto: CreateProdutoDto) {
    console.log(' ID = ', req.user.id);
    return this.produtosService.create(createProdutoDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
