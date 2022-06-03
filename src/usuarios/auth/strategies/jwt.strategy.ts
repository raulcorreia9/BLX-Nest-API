/* eslint-disable prettier/prettier */
import { Usuarios } from './../../entities/usuario.entity';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt"
import { AuthService } from './../auth.service';
import { JwtPayload } from './../models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthService) { 
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        }); 
    }

    async validate(jwtPayload: JwtPayload): Promise<Usuarios> {
        const user = await this.authService.validateUser(jwtPayload)
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

