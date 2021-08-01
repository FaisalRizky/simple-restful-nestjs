import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article/article.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
            CacheModule.register({
              ttl: parseInt(process.env.CACHE_DURATION,10) || 600 //in second cache
            }),
            
            TypeOrmModule.forRoot({
              "type": "mysql",
              "host": process.env.DATABASE_HOST || "localhost",
              "port": parseInt(process.env.DATABASE_PORT, 10) || 3308,
              "username": process.env.DATABASE_USERNAME || "root",
              "password": process.env.DATABASE_PASSWORD || "root",
              "database": process.env.DATABASE_NAME || "nestjs",
              "entities": [Article],
              "autoLoadEntities" : true,
              "synchronize": true
            })
            ,ArticleModule],
  controllers: [AppController],
  providers: [AppService, {
              provide: APP_INTERCEPTOR,
              useClass: CacheInterceptor
            }
  ],
})
export class AppModule {}
