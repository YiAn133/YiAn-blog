import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter.js';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(process.env.PORT ?? 3000);
  
}
await bootstrap();
