/* eslint-disable prettier/prettier */
import{Controller, Get ,Post, Put, Delete, Param, Body, Req, UnauthorizedException} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {Request} from 'express'
import { AttendanceEntity } from './attendance.entity';

interface typeNote{
    internid:string
    date:string
    note:string
}

@Controller('attendances')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService){}

    @Post()
    async createAttendance(@Req() req:Request,@Body() attendance:AttendanceEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.create(attendance);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get()
    findAll(@Req() req:Request): Promise<AttendanceEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.findAll()
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put('note')
    async createNote(@Req() req:Request,@Body() newNote:typeNote):Promise<AttendanceEntity>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.createNote(newNote.note,+newNote.internid,newNote.date)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    findOne(@Req() req:Request,@Param('id') id:string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.findOne(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get('intern/:id')
    findOneByIntern(@Req() req:Request,@Param('id') id:string):Promise<AttendanceEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.findOneByIntern(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put(":id")
    async update(@Req() req:Request,@Param('id') id: string, @Body() updatedAttendance: AttendanceEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.update(+id,updatedAttendance);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(":id")
    async removeAll(@Req() req:Request,@Param('id') id: string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.removeAll(+id);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete(":id/:date")
    async remove(@Req() req:Request,@Param('id') id: string,@Param('date') date:string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.attendanceService.remove(+id,date);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}