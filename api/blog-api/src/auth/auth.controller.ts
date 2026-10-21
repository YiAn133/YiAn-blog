import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { Public } from '../common/public.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(@Body() createAuth:CreateAuthDto){
    return this.authService.signup(createAuth)
  }

  @Public()
  @Post('/login')
  login(@Body() loginAuth:CreateAuthDto){
    return this.authService.login(loginAuth)
  }
}
