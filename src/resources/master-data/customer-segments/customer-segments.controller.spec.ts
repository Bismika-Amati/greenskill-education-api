import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSegmentsController } from './customer-segments.controller';
import { CustomerSegmentsService } from './customer-segments.service';

describe('CustomerSegmentsController', () => {
  let controller: CustomerSegmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSegmentsController],
      providers: [CustomerSegmentsService],
    }).compile();

    controller = module.get<CustomerSegmentsController>(
      CustomerSegmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
