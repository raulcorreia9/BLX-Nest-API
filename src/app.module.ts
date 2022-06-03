import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './src/auth/auth.module';
import { AuthModule } from './src/usuarios/auth/auth/auth.module';
import { Auth.ModuleModule } from './usuario/auth/auth.module/auth.module.module';

@Module({
  imports: [
    UsuariosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    Auth.ModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
