import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PostsModule } from './posts/posts.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard.js';
import {Post} from './posts/entities/post.entity.js'
import { AuthModule } from './auth/auth.module.js';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
    isGlobal:true}),
    
  TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,        // 仅开发
        logging: ['query', 'error'],
        timezone: 'Z',
        charset: 'utf8mb4',
      }),
    }),
    
  AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:JwtAuthGuard
  }],

})
export class AppModule {}
