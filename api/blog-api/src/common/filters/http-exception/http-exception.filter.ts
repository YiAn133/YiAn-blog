import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpException } from '@nestjs/common'; 
import  type { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('进入异常过滤器')
    // 这里的错误可能是对象 也可能是字符串，故而要进行判断
    const ctx = host.switchToHttp();//得到Http的上下文
    const response = ctx.getResponse<Response>();//用来定义错误返回的格式
    const status = exception.getStatus()
    const ExceptionResponse : any = exception.getResponse()
    let errorMessage = ""
    if(typeof ExceptionResponse === 'object'){
      errorMessage = typeof ExceptionResponse.message === 'string' ? ExceptionResponse.message : ExceptionResponse.message[0];
    }else{
      errorMessage = ExceptionResponse
    }
    // 设置响应体的响应头 响应体
    const errorBody = {
      data:{},
      errorMessage,
      code: -1,
    }
      // 设置返回的状态码， 请求头，发送错误信息
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorBody);


  }
}
