/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException } from "@nestjs/common";
import { PlanService } from "./plan.service";
import {Request} from 'express'
import { PlanEntity } from "./plan.entity";

@Controller("plans")
export class PlanController{
    constructor(private readonly planService: PlanService){}
    
    @Get()
    getAll(@Req() req:Request):Promise<PlanEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.planService.findAll();
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get("intern")
    getAllForIntern(@Req() req:Request):Promise<PlanEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.planService.findAllForIntern();
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post()
    create(@Req() req:Request,@Body() plan:PlanEntity):Promise<PlanEntity>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.planService.create(plan);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    findOne(@Req() req:Request,@Param('id') id:string): Promise<PlanEntity>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.planService.findOne(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put(":id")
    update(@Req() req:Request,@Param('id') id: string, @Body() updatedUser: PlanEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.planService.update(+id,updatedUser);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(":id")
    remove(@Req() req:Request,@Param('id') id: string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.planService.remove(+id);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}