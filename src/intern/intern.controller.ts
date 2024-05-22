/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException } from "@nestjs/common";
import { InternService } from "./intern.service";
import {Request} from 'express'
import { InternEntity } from "./intern.entity";

interface typeValue{
    value:number
}

@Controller('interns')
export class InternController{
    constructor(private readonly internService: InternService){}

    @Post("sendmail")
    async sendMail(@Req() req:Request,@Body() info:{to:string,subject:string,object:string}): Promise<string> {
        try {
            await this.internService.sendMail(
                info.to, // Alıcı e-posta adresi
                info.subject, // E-posta konusu
                info.object // E-posta içeriği
            );
            return 'E-posta gönderildi!';
        } catch (error) {
            return 'E-posta gönderilemedi!';
        }
    }

    @Put('active/:id')
    putActive(@Req() req:Request,@Param('id') id:string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                this.internService.putActive(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get()
    async getAllInterns(@Req() req:Request):Promise<InternEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]

            if(cookie||local){
                return await this.internService.findAll();
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get('mail/:mail')
    findInternIdByMail(@Req() req:Request,@Param('mail') mail:string):Promise<{id:number}>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.internService.findInternIdByMail(mail)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get("plan")
    getAllForDetail(@Req() req:Request):Promise<InternEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.internService.findAllForDetail();
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    getInternById(@Req() req:Request,@Param("id") id:string):Promise<InternEntity>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.internService.findOne(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post()
    createIntern(@Req() req:Request,@Body() intern:InternEntity){
        return this.internService.create(intern)   
    }

    @Put("completed/:id")
    updateInternCompleted(@Req() req:Request,@Param("id") id:string,@Body() completed:typeValue){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.internService.updateCompleted(+id,completed)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put(":id")
    updateIntern(@Req() req:Request,@Param("id") id:string, @Body() updatedIntern:InternEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.internService.update(+id,updatedIntern)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(":id")
    deleteIntern(@Req() req:Request,@Param("id") id:string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.internService.remove(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}