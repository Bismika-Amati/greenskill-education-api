import { Test, TestingModule } from '@nestjs/testing';
import { EarlyAdoptersController } from './early-adopters.controller';
import { EarlyAdoptersService } from './early-adopters.service';

describe('EarlyAdoptersController', () => {
  let controller: EarlyAdoptersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarlyAdoptersController],
      providers: [EarlyAdoptersService],
    }).compile();

    controller = module.get<EarlyAdoptersController>(EarlyAdoptersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
