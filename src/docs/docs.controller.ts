/* eslint-disable prettier/prettier */
import{Controller, Get ,Post, Put, Delete, Param, Body, Req, UnauthorizedException} from '@nestjs/common';
import { DocsService } from './docs.service';
import {Request} from 'express'
import { DocsEntity } from './docs.entity';

@Controller('docs')
export class DocsController {
    constructor(private readonly docsService: DocsService){}

    @Post()
    createUser(@Req() req:Request,@Body() docs:DocsEntity){
        try {
            const cookie = req.cookies['jwt']

            if(cookie){
                return this.docsService.create(docs);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get()
    findAll(@Req() req:Request): Promise<DocsEntity[]>{
        try {
            const cookie = req.cookies['jwt']

            if(cookie){
                return this.docsService.findAll()
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    findOne(@Req() req:Request,@Param('id') id:string): Promise<DocsEntity>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.docsService.findOne(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get('intern/:id')
    findOneByIntern(@Req() req:Request,@Param('id') id:string):Promise<DocsEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.docsService.finOneByIntern(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Put(":id")
    update(@Req() req:Request,@Param('id') id: string, @Body() updatedDocs: DocsEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.docsService.update(+id,updatedDocs);
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
                return this.docsService.remove(+id);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}