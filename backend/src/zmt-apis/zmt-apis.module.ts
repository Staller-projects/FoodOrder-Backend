import { Module } from '@nestjs/common';
import { ZmtApisController } from './zmt-apis.controller';
import { ZmtApisService } from './zmt-apis.service';

@Module({
  controllers: [ZmtApisController],
  providers: [ZmtApisService]
})
export class ZmtApisModule {}
