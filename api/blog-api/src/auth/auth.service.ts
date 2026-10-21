import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { Auth } from './entities/auth.entity.js'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly AuthRepository:Repository<Auth>,
              private readonly JwtService:JwtService
){}

  // 注册逻辑
  async signup(createAuth : CreateAuthDto){
    // 首先先要看密码和姓名是否为空：这个可以在DTO中进行判断
    // 然后根据用户的姓名进行查找，如果找到了，用户重复
    const {userName} = createAuth
    const findUser = await this.AuthRepository.findOne({where:{userName}})
    if(findUser){
      throw new HttpException("注册的用户已经存在",400)
    }
    const passWord = bcryptjs.hashSync(createAuth.passWord,10)
    const newUser = this.AuthRepository.create({
      ...createAuth,
      passWord:passWord
    })
    await this.AuthRepository.save(newUser)
    return "注册成功"
  }

  // 登录逻辑
  async login(loginData:CreateAuthDto){
    const {userName , passWord} = loginData

    // 先去找改名称的用户是否存在 如果存在 那么可以继续执行
    const findUser = await this.AuthRepository.findOne({where:{userName}})
    if(!findUser){
      throw new HttpException("要登录的用户不存在",401)
    }
    const isTrue = bcryptjs.compareSync(passWord,findUser.passWord)
    if(!isTrue){
      throw new BadRequestException("用户密码错误")
    }
    const payload = {userName}


    return {
      msg:"登录成功",
      access_token: this.JwtService.sign(payload)}

  }
}
