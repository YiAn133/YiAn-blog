import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Auth } from './entities/auth.entity.js'
import {JwtModule,JwtService} from '@nestjs/jwt'
import { jwtConstants } from '../common/contstants.js';
import {jwtAuthStrategy} from './jwt-auth/jwt-auth.strategy.js'

@Module({
  imports:[TypeOrmModule.forFeature([Auth]),
          JwtModule.register({
            secret:jwtConstants.secret,
            signOptions:{expiresIn:jwtConstants.expiresIn}
          })
],
  controllers: [AuthController],
  providers: [AuthService,jwtAuthStrategy],
})
export class AuthModule {}
