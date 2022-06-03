/* eslint-disable prettier/prettier */
import { JwtPayload } from './models/jwt-payload.model';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Usuarios } from '../entities/usuario.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  public async criaToken(userId: number): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<Usuarios> {
    const user = await this.usuariosRepository.findOne({
      id: jwtPayload.userId,
    });
    if (!user) {
      throw new UnauthorizedException('Ususario não encontrado.');
    }

    return user;
  }

  private static jwtExtractor(requests: Request): string {
    const authHeader = requests.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request.');
    }

    //Destructering do authHeader = 'Bearer[0] meuToken[1]'
    const [bearer, token] = authHeader.split(' ');

    return token;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor;
  }
}
