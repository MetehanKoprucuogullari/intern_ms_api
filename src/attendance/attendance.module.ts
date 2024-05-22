/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common/decorators/modules";
import { AttendanceController } from "./attendance.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from  "./attendance.service";
import { AttendanceEntity } from "./attendance.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AttendanceEntity])],
    controllers : [AttendanceController],
    providers : [AttendanceService],
})

export class AttendanceModule {}