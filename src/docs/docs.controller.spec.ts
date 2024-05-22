/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm"
import { DocsController } from "./docs.controller"
import { DocsService } from "./docs.service"
import { DocsEntity } from "./docs.entity"
import {Request} from "express"

describe('UserController',()=>{
    let docsService : DocsService
    let docsController : DocsController
    let docsConnection : Connection
    let docsRepository : Repository<DocsEntity>
    let req: Request
    beforeEach(()=>{
        docsService = new DocsService(docsRepository,docsConnection)
        docsController = new DocsController(docsService)
        req = {
            headers: {},
            cookies: { jwt: 'your_jwt_token_here' }, // Provide a valid JWT token here
        } as Request;
    })

    describe("createDocs",()=>{
        it("Should create a docs",async()=>{
            const docs: DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"create").mockResolvedValue(docs)

            const result = await docsController.createUser(req,docs)
            expect(result).toEqual(docs)
        })
    })

    describe("findOne",()=>{
        it("Should return an item of aocss",async()=>{
            const docs: DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"findOne").mockResolvedValue(docs)

            const result = await docsController.findOne(req,"2")
            expect(result).toEqual(docs)
        })
    })

    describe("update",()=>{
        it("Should update an user",async()=>{
            const docs : DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"update").mockResolvedValue(docs)

            const result = await docsController.update(req,"1",docs)
            expect(result).toEqual(docs)
        })
    })

    describe("remove",()=>{
        it("Should delete an user",async()=>{
            const docs : DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"remove").mockResolvedValue(docs)

            const result = await docsController.remove(req,"1")
            expect(result).toEqual(docs)
        })
    })
})