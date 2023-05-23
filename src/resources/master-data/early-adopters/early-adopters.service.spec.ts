import { Test, TestingModule } from '@nestjs/testing';
import { EarlyAdoptersService } from './early-adopters.service';

describe('EarlyAdoptersService', () => {
  let service: EarlyAdoptersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarlyAdoptersService],
    }).compile();

    service = module.get<EarlyAdoptersService>(EarlyAdoptersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
