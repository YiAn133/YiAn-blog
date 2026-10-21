import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthGuard} from '@nestjs/passport'
import {Reflector} from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../common/public.decorator.js';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector:Reflector){
    super()
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 去方法找
    // 去构造方法找
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if(isPublic){
      return true
    }

    return super.canActivate(context)
  }
}
