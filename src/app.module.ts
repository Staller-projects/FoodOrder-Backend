import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { ZmtApisModule } from './zmt-apis/zmt-apis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ZmtApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
