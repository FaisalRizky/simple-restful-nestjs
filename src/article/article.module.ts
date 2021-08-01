import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
 
@Module({
  imports: [TypeOrmModule.forFeature([Article]), CacheModule.register()],
  controllers: [ArticleController],
  providers: [ArticleService,
              {
                provide: APP_INTERCEPTOR,
                useClass: CacheInterceptor,
              }
             ]
})
export class ArticleModule {}
