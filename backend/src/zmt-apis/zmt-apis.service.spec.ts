import { Test, TestingModule } from '@nestjs/testing';
import { ZmtApisService } from './zmt-apis.service';

describe('ZmtApisService', () => {
  let service: ZmtApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZmtApisService],
    }).compile();

    service = module.get<ZmtApisService>(ZmtApisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
