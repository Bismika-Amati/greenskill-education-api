import { Test, TestingModule } from '@nestjs/testing';
import { DoneModulesService } from './done-modules.service';

describe('DoneModulesService', () => {
  let service: DoneModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoneModulesService],
    }).compile();

    service = module.get<DoneModulesService>(DoneModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
