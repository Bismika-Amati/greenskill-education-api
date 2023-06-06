import { Test, TestingModule } from '@nestjs/testing';
import { VillagePicturesController } from './village-pictures.controller';
import { VillagePicturesService } from './village-pictures.service';

describe('VillagePicturesController', () => {
  let controller: VillagePicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VillagePicturesController],
      providers: [VillagePicturesService],
    }).compile();

    controller = module.get<VillagePicturesController>(
      VillagePicturesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
