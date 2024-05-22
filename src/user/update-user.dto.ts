/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from './create-user.dto';

export class UpdatedUserDto extends PartialType(createUserDto){
    name: string
    password:string
    role:string
    field:string
} 