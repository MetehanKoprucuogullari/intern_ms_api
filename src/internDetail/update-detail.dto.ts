/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailDto } from './create-detail.dto';

export class UpdateDetailDto extends PartialType(CreateDetailDto){
    intern:number
    plan:number
    startDate:string
    endDate:string
    done:boolean
    point:number
}