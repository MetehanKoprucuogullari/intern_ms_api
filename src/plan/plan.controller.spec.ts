/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { PlanEntity } from "./plan.entity";
import {Request} from "express"

describe("PlanController",()=>{
    let planController: PlanController
    let planService : PlanService
    let planRepository : Repository<PlanEntity>
    let planConnection : Connection
    let req : Request

    beforeEach(()=>{
        planService = new PlanService(planRepository,planConnection)
        planController = new PlanController(planService)
        req = {
            headers: {},
            cookies: { jwt: 'your_jwt_token_here' }, // Provide a valid JWT token here
          } as Request;
    })

    describe("getAll",()=>{
        it("Should return an array of plans",async()=>{
            const plans: PlanEntity[] = [
                {id:1,days:3,description:"asd",title:"ksa",field:""},
                {id:1,days:3,description:"asd",title:"ksa",field:""}
            ]

            jest.spyOn(planService,"findAll").mockResolvedValue(plans)

            const result = await planController.getAll(req)
            expect(result).toEqual(plans)
        })
    })

    describe("getAllForIntern",()=>{
        it("Should return an array of id column", async()=>{
            const plans : PlanEntity[] = [
                {id:1,days:3,description:"asd",title:"ksa",field:""},
                {id:1,days:3,description:"asd",title:"ksa",field:""}
            ]
    
            jest.spyOn(planService,'findAllForIntern').mockResolvedValue(plans)
            
            const result = await planController.getAllForIntern(req);
            expect(result).toEqual(plans)
        })
    })

    describe("create",()=>{
        it("Should create a new plan",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa",field:""}

            jest.spyOn(planService,"create").mockResolvedValue(plan)

            const result = await planController.create(req,plan)
            expect(result).toEqual(plan)
        })
    })

    describe('findOne',()=>{
        it("Should return an item of plans",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa",field:""}
            
            jest.spyOn(planService,"findOne").mockResolvedValue(plan)

            const result = await planController.findOne(req,"1")
            expect(result).toEqual(plan)
        })
    })

    describe("Should update an item of interns",()=>{
        it("update",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa",field:""}

            jest.spyOn(planService,"update").mockResolvedValue(plan)

            const result = await planController.update(req,"1",plan)
            expect(result).toEqual(plan)
        })
    })

    describe("Should delete an item of interns",()=>{
        it("remove",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa",field:""}

            jest.spyOn(planService,"remove").mockResolvedValue(plan)

            const result = await planController.remove(req,"1")
            expect(result).toEqual(plan)
        })
    })
})