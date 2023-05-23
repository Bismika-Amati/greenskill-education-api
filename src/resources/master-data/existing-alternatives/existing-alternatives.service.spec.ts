import { Test, TestingModule } from '@nestjs/testing';
import { ExistingAlternativesService } from './existing-alternatives.service';

describe('ExistingAlternativesService', () => {
  let service: ExistingAlternativesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExistingAlternativesService],
    }).compile();

    service = module.get<ExistingAlternativesService>(ExistingAlternativesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
