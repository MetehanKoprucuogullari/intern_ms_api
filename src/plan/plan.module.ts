/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from "./plan.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PlanEntity])],
    controllers: [PlanController],
    providers : [PlanService],
})

export class PlanModule{}