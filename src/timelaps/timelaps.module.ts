import { Module } from '@nestjs/common';
import { TimelapsController } from './timelaps.controller';
import { TimelapsService } from './timelaps.service';

@Module({
    controllers: [TimelapsController],
    providers: [TimelapsService],
})
export class TimelapsModule { }
