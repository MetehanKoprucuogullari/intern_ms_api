/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInternDto } from './create-intern.dto';

export class UpdateInternDto extends PartialType(CreateInternDto){
    name:string
    mail:string
    confirmed:boolean
    grade:number
    school:string
    department:string
    field:string
    completed:number
    image: string;
    resume: string;
    startdate: string
    enddate:string
}