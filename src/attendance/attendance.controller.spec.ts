/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm"
import { AttendanceController } from "./attendance.controller"
import { AttendanceService } from "./attendance.service"
import { AttendanceEntity } from "./attendance.entity"
import {Request} from 'express'


describe('UserController',()=>{
    let attendanceService : AttendanceService
    let attendanceController : AttendanceController
    let attendanceConnection : Connection
    let attendanceRepository : Repository<AttendanceEntity>
    let req: Request
    beforeEach(()=>{
        attendanceService = new AttendanceService(attendanceRepository,attendanceConnection)
        attendanceController = new AttendanceController(attendanceService)
        req = {
            headers: {},
            cookies: { jwt: 'your_jwt_token_here' }, // Provide a valid JWT token here
        } as Request;
    })

    describe("createAttendance",()=>{
        it("Should create a attendance",async()=>{
            const attendance: AttendanceEntity = {id:1,internid:1,date:"17",value:true,note:""}
            jest.spyOn(attendanceService,"create").mockResolvedValue(attendance)
            
            const result = await attendanceController.createAttendance(req,attendance)
            expect(result).toEqual(attendance)
        })
    })

    describe("findAll",()=>{
        it("Should return all attendances",async()=>{
            const attendance: AttendanceEntity[] = [{id:1,internid:1,date:"17",value:true,note:""}]

            jest.spyOn(attendanceService,"findAll").mockResolvedValue(attendance)

            const result = await attendanceController.findAll(req)
            expect(result).toEqual(attendance)
        })
    })

    describe("findOne",()=>{
        it("Should return an item of attendances",async()=>{
            const attendance: AttendanceEntity = {id:1,internid:1,date:"17",value:true,note:""}

            jest.spyOn(attendanceService,"findOne").mockResolvedValue(attendance)

            const result = await attendanceController.findOne(req,"2")
            expect(result).toEqual(attendance)
        })
    })

    describe("createNote",()=>{
        it("Should create a note",async()=>{
            const attendance: {internid:string,note:string,date:string} = {internid:"",note:"",date:""}

            jest.spyOn(attendanceService,"createNote").mockResolvedValue(attendance)

            const result = await attendanceController.createNote(req,attendance)
            
            expect(result).toEqual(attendance)
        })
    })

    describe("findOne",()=>{
        it("Should return an attendance",async()=>{
            const attendance: AttendanceEntity = {id:0,internid:1,note:"",date:"",value:true}

            jest.spyOn(attendanceService,"findOne").mockResolvedValue(attendance)

            const result = await attendanceController.findOne(req,"0")
            
            expect(result).toEqual(attendance)
        })
    })

    describe("findOneByIntern",()=>{
        it("Should return all attendances",async()=>{
            const attendance: AttendanceEntity[] = [{id:0,internid:1,note:"",date:"",value:true}]

            jest.spyOn(attendanceService,"findOneByIntern").mockResolvedValue(attendance)

            const result = await attendanceController.findOneByIntern(req,"0")
            
            expect(result).toEqual(attendance)
        })
    })

    describe("update",()=>{
        it("Should update an user",async()=>{
            const attendance : AttendanceEntity = {id:1,internid:1,date:"17",value:true,note:""}

            jest.spyOn(attendanceService,"update").mockResolvedValue(attendance)

            const result = await attendanceController.update(req,"1",attendance)
            expect(result).toEqual(attendance)
        })
    })

    describe("remove",()=>{
        it("Should delete an user",async()=>{
            const attendance : AttendanceEntity = {id:1,internid:1,date:"17",value:true,note:""}

            jest.spyOn(attendanceService,"remove").mockResolvedValue(attendance)

            const result = await attendanceController.remove(req,"1","ssad")
            expect(result).toEqual(attendance)
        })
    })
})