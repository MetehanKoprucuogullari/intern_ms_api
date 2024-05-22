/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { InternController } from "./intern.controller";
import { InternService } from "./intern.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternEntity } from "./intern.entity";

@Module({
    imports: [TypeOrmModule.forFeature([InternEntity])],
    controllers:[InternController],
    providers : [InternService]
})

export class InternModule{}