import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('ArticleController', () => {
  let controller: ArticleController;
  const mockArticleService ={
      create: jest.fn( dto => {
        return {
          id: Date.now(),
          ...dto,
          created: Date.now(),
        }
      })
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService]
    }).overrideProvider(ArticleService)
      .useValue(mockArticleService)
      .compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
  it('should get Article', () => {
    expect(controller.create({
            "author": "Faisal",
            "title" : "My First Nest JS App",
            "body"  : "This is my First Nest Js App"
           }))
    .toEqual({
          id: expect.any(Number),
          created: expect.any(Number),
          author: "Faisal",
          title : "My First Nest JS App",
          body  : "This is my First Nest Js App"
    });
  });
});
