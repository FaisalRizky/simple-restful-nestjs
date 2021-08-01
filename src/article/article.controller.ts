import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticle } from './dto/CreateArticle.dto';

@Controller('articles')
export class ArticleController {
    constructor(private ArticleService : ArticleService) {
    }

    @Get('filter')
    async findByFilter(
        @Query('query') query: string,
        @Query('author') author: string
    ) {
        return this.ArticleService.filter({
            author,
            query
        });
    }

    @Get()
    async all() {
        //console.warn("This Method was Executed") // Check Cache
        return this.ArticleService.all();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() articleData : CreateArticle,
    ) {
        return this.ArticleService.create({
            author : articleData.author,
            title : articleData.title,
            body : articleData.body
        });
    }

    @Get(':id')
    async get(
        @Param('id') id : number
    ) {
        //console.warn("This get by Id Method was Executed") // Check Cache
        return this.ArticleService.get(id);
    }

}
