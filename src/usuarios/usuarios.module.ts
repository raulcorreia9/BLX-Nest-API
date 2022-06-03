import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './entities/usuario.entity';
import { Auth.ModuleModule } from './auth/auth.module/auth.module.module';
import { AuthModule } from './auth/auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios]), Auth.ModuleModule, AuthModule],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
