import { Test, TestingModule } from '@nestjs/testing';
import { SubDistrictsController } from './sub-districts.controller';
import { SubDistrictsService } from './sub-districts.service';

describe('SubDistrictsController', () => {
  let controller: SubDistrictsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubDistrictsController],
      providers: [SubDistrictsService],
    }).compile();

    controller = module.get<SubDistrictsController>(SubDistrictsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
