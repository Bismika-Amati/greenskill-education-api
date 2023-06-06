import { Test, TestingModule } from '@nestjs/testing';
import { ArticleSubModulesService } from './article-sub-modules.service';

describe('ArticleSubModulesService', () => {
  let service: ArticleSubModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleSubModulesService],
    }).compile();

    service = module.get<ArticleSubModulesService>(ArticleSubModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
