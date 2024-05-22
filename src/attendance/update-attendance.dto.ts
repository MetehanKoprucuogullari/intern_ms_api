/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { createAttendanceDto } from './create-attendance.dto';

export class UpdatedAttendanceDto extends PartialType(createAttendanceDto){
    internid: number
    date:string
    value: boolean;
    note:string
} 