/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PlanEntity } from "./plan.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreatePlanDto } from "./create-plan.dto";
import { UpdatePlanDto } from "./update-plan.dto";

@Injectable()
export class PlanService{
    constructor(@InjectRepository(PlanEntity) private readonly planRepository: Repository<PlanEntity>, private connection:Connection) {}

    create(createPlanDto: CreatePlanDto): Promise<PlanEntity>{
        const plan: PlanEntity = new PlanEntity()
        plan.title = createPlanDto.title;
        plan.description = createPlanDto.description;
        plan.days = createPlanDto.days;
        plan.field = createPlanDto.field;
        return this.planRepository.save(plan)
    }

    findAll():Promise<PlanEntity[]>{
        const result = this.connection.query("select * from plan_entity")
        return result
    }

    findAllForIntern():Promise<PlanEntity[]>{
        const result = this.connection.query('select * from plan_entity')
        console.log(result)
        return result;
    }

    findOne(id: number){
        return this.planRepository.findOneById(id)
    }

    update(id:number , updatePlanDto: UpdatePlanDto){
        const plan : PlanEntity = new PlanEntity();
        plan.title = updatePlanDto.title;
        plan.description = updatePlanDto.description;
        plan.days = updatePlanDto.days;
        plan.field = updatePlanDto.field;
        plan.id = id
        return this.planRepository.save(plan)
    }

    remove(id: number){
        this.connection.query('delete from detail_entity where "planId" = '+id)
        const deleted = this.planRepository.findOneById(id)
        this.planRepository.delete(id) 
        return deleted
    }
}