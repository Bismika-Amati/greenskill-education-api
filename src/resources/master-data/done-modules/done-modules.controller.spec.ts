import { Test, TestingModule } from '@nestjs/testing';
import { DoneModulesController } from './done-modules.controller';
import { DoneModulesService } from './done-modules.service';

describe('DoneModulesController', () => {
  let controller: DoneModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoneModulesController],
      providers: [DoneModulesService],
    }).compile();

    controller = module.get<DoneModulesController>(DoneModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
