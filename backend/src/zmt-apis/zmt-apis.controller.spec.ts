import { Test, TestingModule } from '@nestjs/testing';
import { ZmtApisController } from './zmt-apis.controller';

describe('ZmtApisController', () => {
  let controller: ZmtApisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZmtApisController],
    }).compile();

    controller = module.get<ZmtApisController>(ZmtApisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
