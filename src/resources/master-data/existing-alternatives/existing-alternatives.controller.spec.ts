import { Test, TestingModule } from '@nestjs/testing';
import { ExistingAlternativesController } from './existing-alternatives.controller';
import { ExistingAlternativesService } from './existing-alternatives.service';

describe('ExistingAlternativesController', () => {
  let controller: ExistingAlternativesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExistingAlternativesController],
      providers: [ExistingAlternativesService],
    }).compile();

    controller = module.get<ExistingAlternativesController>(ExistingAlternativesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
