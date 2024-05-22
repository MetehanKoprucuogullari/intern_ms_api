/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { AttendanceEntity } from "./attendance.entity";
import { createAttendanceDto } from "./create-attendance.dto";
import { UpdatedAttendanceDto } from "./update-attendance.dto";

@Injectable()
export class AttendanceService {
    constructor(@InjectRepository(AttendanceEntity) private readonly attendanceRepository: Repository<AttendanceEntity>, private connection: Connection) {}

    create(createAttendanceDto: createAttendanceDto): Promise<AttendanceEntity>{
        const internId = createAttendanceDto.internid
        const date = createAttendanceDto.date
        const value = createAttendanceDto.value
        const query = this.connection.query(`
            INSERT INTO attendance_entity ("internid", "date", "value")
            VALUES (${internId}, '${date}', ${value})
            ON CONFLICT ("internid", "date") DO UPDATE
            SET "value" = EXCLUDED."value";
        `)
        return query
    }

    createNote(note:string,internid:number,date:string){
        const newNote = this.connection.query(`
            update attendance_entity 
            set note = '${note}'
            where internid = ${internid}
            and date =  '${date}'
        `)
        newNote.finally(()=>{
            console.log({internid:internid,note:note,date:date})
            return {internid:internid,note:note,date:date}
        })
        return null
    }

    async findAll():Promise<AttendanceEntity[]>{
        return await this.connection.query("select * from attendance_entity")
    }

    async findOne(id:number){
        return await this.attendanceRepository.findOneById(id)
    }
    
    async findOneByIntern(id:number):Promise<AttendanceEntity[]>{
        const query = await this.connection.query(`
            select * from attendance_entity where "internid" = ${id}`
        )
        return query
    }

    update(id:number , updateAttendanceDto: UpdatedAttendanceDto){
        const attendance : AttendanceEntity = new AttendanceEntity();
        attendance.internid = updateAttendanceDto.internid;
        attendance.date = updateAttendanceDto.date;
        attendance.value = updateAttendanceDto.value
        attendance.id = id
        return this.attendanceRepository.save(attendance)
    }

    removeAll(id: number){
        const deleted = this.connection.query(`
            Delete from attendance_entity where internid = ${id}
        `)
        return deleted
    }

    remove(id: number, date:string){
        const deleted = this.connection.query(`
            Delete from attendance_entity where internid = ${id}
            and date = '${date}'
        `)
        return deleted
    }

}