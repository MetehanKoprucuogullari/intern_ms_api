/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException } from "@nestjs/common";
import { DetailService } from "./detail.service";
import {Request} from 'express'
import { DetailEntity } from "./detail.entity";

@Controller("details")
export class DetailController{
    constructor(private readonly detailService :DetailService){}

    @Get()
    getAllDetails(@Req() req:Request):Promise<DetailEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(local||cookie){
                return this.detailService.findAll()
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get(":id")
    getDetailById(@Req() req:Request,@Param("id") id:string):Promise<DetailEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.detailService.findOneIntern(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post("intern")
    createInternDetail(@Req() req:Request,@Body() detail:DetailEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.detailService.createInternDetail(detail)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post("plan")
    createPlanDetail(@Req() req:Request,@Body() detail:DetailEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.detailService.createPlanDetail(detail)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put(":id")
    updateDetail(@Req() req:Request,@Param("id") id:string, @Body() updatedDetail:DetailEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.detailService.update(+id,updatedDetail)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(":id")
    deleteDetail(@Req() req:Request,@Param("id") id:string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.detailService.remove(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}