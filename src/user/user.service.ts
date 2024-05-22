/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { UserEntity } from "./user.entity";
import { createUserDto } from "./create-user.dto";
import { UpdatedUserDto } from "./update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private connection: Connection
    ) {}

    async login(authInfos: createUserDto):Promise<UserEntity>{
        return this.userRepository.findOne({where:{name:String(authInfos.name)}})
    }

    create(createUserDto: createUserDto): Promise<UserEntity>{
        const user : UserEntity = new UserEntity();
        user.name = createUserDto.name;
        user.password = createUserDto.password;
        user.role = createUserDto.role;
        user.field = createUserDto.field
        return this.userRepository.save(user)
    }

    createField(name:string){
        const newField = this.connection.query(
            `insert into fields (name) values ('${name}')`
        )
        return newField
    }

    deleteField(id:string){
        const deletedField = this.connection.query(
            `delete from fields where id = ${id}`
        )
        return deletedField
    }

    findAllFields():Promise<{id:string,name:string}>{
        const fields = this.connection.query(
            `select * from fields`
        )
        return fields
    }

    findId(mail:string):Promise<{id:string}>{
        return this.connection.query(`select id from user_entity where name = '${mail}'`)
    }

    findAll():Promise<UserEntity[]>{
        return this.connection.query("select * from user_entity")
    }

    findOne(id:number):Promise<UserEntity>{
        return this.userRepository.findOneById(id)
    }
    
    update(id:number , updateUserDto: UpdatedUserDto){
        const user : UserEntity = new UserEntity();
        user.name = updateUserDto.name;
        user.password = updateUserDto.password;
        user.id = id
        return this.userRepository.save(user)
    }

    remove(name: string){
        const deleted = this.connection.query(`delete from user_entity where name = '${name}'`)
        return deleted
    }

}