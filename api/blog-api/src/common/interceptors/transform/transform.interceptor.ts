import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable , map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('进入了成功拦截器');
    
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code:0,
          msg:"成功执行"
        }
      })
    );
  }
}
