import { Test, TestingModule } from '@nestjs/testing';
import { ArticleSubModulesController } from './article-sub-modules.controller';
import { ArticleSubModulesService } from './article-sub-modules.service';

describe('ArticleSubModulesController', () => {
  let controller: ArticleSubModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleSubModulesController],
      providers: [ArticleSubModulesService],
    }).compile();

    controller = module.get<ArticleSubModulesController>(ArticleSubModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
