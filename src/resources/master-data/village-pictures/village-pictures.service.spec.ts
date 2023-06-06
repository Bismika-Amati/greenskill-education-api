import { Test, TestingModule } from '@nestjs/testing';
import { VillagePicturesService } from './village-pictures.service';

describe('VillagePicturesService', () => {
  let service: VillagePicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VillagePicturesService],
    }).compile();

    service = module.get<VillagePicturesService>(VillagePicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
