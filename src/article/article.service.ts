import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from './article.entity';
import { Repository, Brackets } from "typeorm";

@Injectable()
export class ArticleService {
    constructor (
        @InjectRepository(Article) private readonly articleRepository : Repository<Article>,
     ) {
    }

    async all(): Promise<Article[]> {
        return this.articleRepository.find();
    }

    async create(data) {
        return this.articleRepository.save(data);
    }

    async get(id: number): Promise<Article> {
        return this.articleRepository.findOne({id});
    }

    async filter(query): Promise<any> {
        const qb = this.articleRepository.createQueryBuilder('article')
        return qb.andWhere(new Brackets(sqb => {
                                sqb.where("article.title like :title", {title: `%${query.query}%`});
                                sqb.orWhere("article.author like :author", {author: `%${query.author}%`});
                                sqb.orWhere("article.body like :description", {description: `%${query.query}%`})
                            }))
                 .getMany();
    }
}