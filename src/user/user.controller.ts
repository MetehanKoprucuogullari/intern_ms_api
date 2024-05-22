/* eslint-disable prettier/prettier */
import{Controller, Get ,Post, Put, Delete, 
    Param, Body, Res, Req, UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import {Response,Request} from 'express'
import { JwtService } from "@nestjs/jwt"

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService,private jwtService : JwtService){}

    @Post("/login")
    async login(@Body() user:UserEntity,@Res({passthrough:true}) response:Response){
        try {
            const result = await this.userService.login(user)
            const check = result 
                && result.password == user.password 
                && result.role == user.role
                
            if(check){
                const jwt = await this.jwtService.signAsync({id:result.id})
                response.cookie("jwt",jwt,{httpOnly:true})
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {password,...rest} = result
                return {...rest,jwt:jwt}
            }else{
                return Promise.reject({message:"error"})
            }
        } catch (e) {
            return Promise.reject({message:"error"})
        }
    }

    @Post("field")
    createField(@Body() field:{name:string},@Req() req:Request){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.userService.createField(field.name)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Delete("field/:id")
    deleteField(@Param("id") id:string,@Req() req:Request){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
        
            if(cookie||local){
                return this.userService.deleteField(id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get("field")
    getAllFields(){
        return this.userService.findAllFields()     
    }

    @Get("auth")
    async auth(@Req() req:Request){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            let data
            if(cookie){
                data = await this.jwtService.verifyAsync(cookie)
            }else{
                data = await this.jwtService.verifyAsync(String(local))
            }
            const user = await this.userService.findOne(data['id'])

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {password,...rest} = user
            if(user||local){
                return rest
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }   
    }

    @Post("logout")
    logout(@Res({passthrough:true}) response:Response):{message:string}{
        response.clearCookie('jwt')
        return {message:"success"}
    }


    @Get("/mail/:mail")
    getId(@Req() req:Request,@Param('mail') mail:string):Promise<{id:string}>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.userService.findId(mail);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get()
    getAllUsers(@Req() req:Request):Promise<UserEntity[]>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.userService.findAll();
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        } 
    }

    @Post()
    async createUser(@Req() req:Request,@Body() user:UserEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                this.userService.create(user);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {password,...rest} = user
                return rest
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    findOne(@Req() req:Request,@Param('id') id:string): Promise<UserEntity>{
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.userService.findOne(+id)
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        
    }

    @Put(":id")
    async update(@Req() req:Request,@Param('id') id: string, @Body() updatedUser: UserEntity){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
            if(cookie||local){
                return this.userService.update(+id,updatedUser);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        
    }

    @Delete(":name")
    async remove(@Req() req:Request,@Param('name') name: string){
        try {
            const cookie = req.cookies['jwt']
            const local = req.headers["jwt"]
        
            if(cookie||local){
                return this.userService.remove(name);
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
        
    }
}