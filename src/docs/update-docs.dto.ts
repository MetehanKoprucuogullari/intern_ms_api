/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { createDocsDto } from './create-docs.dto';

export class UpdatedDocsDto extends PartialType(createDocsDto){
    internid: number
    accForm:string
    criRecord:string
    educDoc:string
    idRegister:string
} 