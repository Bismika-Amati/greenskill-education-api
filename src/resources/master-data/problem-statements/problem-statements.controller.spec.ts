import { Test, TestingModule } from '@nestjs/testing';
import { ProblemStatementsController } from './problem-statements.controller';
import { ProblemStatementsService } from './problem-statements.service';

describe('ProblemStatementsController', () => {
  let controller: ProblemStatementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemStatementsController],
      providers: [ProblemStatementsService],
    }).compile();

    controller = module.get<ProblemStatementsController>(ProblemStatementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
