/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { DocsEntity } from "./docs.entity";
import { createDocsDto } from "./create-docs.dto";
import { UpdatedDocsDto } from "./update-docs.dto";

@Injectable()
export class DocsService {
    constructor(@InjectRepository(DocsEntity) private readonly docsRepository: Repository<DocsEntity>, private connection: Connection) {}

    create(createDocsDto: createDocsDto): Promise<DocsEntity>{
        const internId = createDocsDto.internid
        const accForm = createDocsDto.accForm
        const criRecord = createDocsDto.criRecord
        const educDoc = createDocsDto.educDoc
        const idRegister = createDocsDto.idRegister 
        const query = this.connection.query(`
            INSERT INTO docs_entity ("internid", "accForm", "criRecord", "educDoc", "idRegister")
            VALUES (${internId}, '${accForm}', '${criRecord}', '${educDoc}', '${idRegister}')
            ON CONFLICT ("internid") DO UPDATE
            SET "accForm" = EXCLUDED."accForm", "criRecord" = 
            EXCLUDED."criRecord", "educDoc" = EXCLUDED."educDoc", "idRegister" = EXCLUDED."idRegister";
        `)
        return query
    }

    findAll():Promise<DocsEntity[]>{
        return this.connection.query("select * from docs_entity")
    }

    findOne(id:number){
        return this.connection.query("select * from docs_entity where internid = "+id)
    }
    
    finOneByIntern(id:number):Promise<DocsEntity[]>{
        const query = this.connection.query(`
            select * from docs_entity where "internid" = ${id}`
        )
        return query
    }

    update(id:number , updateDocsDto: UpdatedDocsDto){
        const docs : DocsEntity = new DocsEntity();
        docs.internid = updateDocsDto.internid
        docs.accForm = updateDocsDto.accForm
        docs.criRecord = updateDocsDto.criRecord
        docs.educDoc = updateDocsDto.educDoc
        docs.idRegister = updateDocsDto.idRegister
        docs.id = id
        return this.docsRepository.save(docs)
    }

    remove(id: number){
        const deleted = this.connection.query(`
            Delete from docs_entity where internid = ${id}
        `)
        return deleted
    }

}