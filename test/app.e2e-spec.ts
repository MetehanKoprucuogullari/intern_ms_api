/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserEntity } from '../src/user/user.entity';
import { UserService } from '../src/user/user.service';
import { InternService } from '../src/intern/intern.service';
import { InternEntity } from '../src/intern/intern.entity';
import { PlanService } from '../src/plan/plan.service';
import { PlanEntity } from '../src/plan/plan.entity';
import { DetailService } from '../src/internDetail/detail.service';
import { DetailEntity } from '../src/internDetail/detail.entity';

describe('AppController (e2e)', () => {
  let app:INestApplication
  let moduleApp:TestingModule
  
  beforeAll(async ()=>{
    moduleApp = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    app = moduleApp.createNestApplication();
    await app.init();
  });

  afterAll(()=>{
    app.close()
  })
  
  describe("User Tests",()=>{
    let userService : UserService
    let users : UserEntity[]
    
    beforeAll(()=>{
      users = [
        {id:1,name:"dsad",password:"dfsdf",role:"",field:""},
        {id:2,name:"asda",password:"adasd",role:"",field:""}
      ]
      userService = moduleApp.get<UserService>(UserService);
    })

    it('Should return all users', async() => {
      jest.spyOn(userService, "findAll").mockResolvedValue(users);
      const result =  await request(app.getHttpServer()).get('/users').expect(200)
      expect(result.body).toEqual(users)
    });
    
    it('Should create a user', async() => { 
      jest.spyOn(userService, "create").mockResolvedValue(users[0]);
      const result =  await request(app.getHttpServer()).post('/users',()=>{users[0]}).expect(201)
      expect(result.body).toEqual(users[0])
    });
    
    it('Should return a user', async() => { 
      jest.spyOn(userService, "findOne").mockResolvedValue(users[0]);
      const result =  await request(app.getHttpServer()).get('/users/1').expect(200)
      expect(result.body).toEqual(users[0])
    });
    
    it('Should update a user', async() => { 
      jest.spyOn(userService, "update").mockResolvedValue(users[0]);
      const result =  await request(app.getHttpServer()).put('/users/1').expect(200)
      expect(result.body).toEqual(users[0])
    });
    
    it('Should delete a user', async() => { 
      jest.spyOn(userService, "remove").mockResolvedValue(users[0]);
      const result =  await request(app.getHttpServer()).delete('/users/1').expect(200)
      expect(result.body).toEqual(users[0])
    });
  })

  describe("Intern Tests",()=>{
    let internService : InternService
    let interns : InternEntity[]
    
    beforeAll(()=>{
      interns = [
        {id:1,name:"dsad",confirmed:false,mail:"assad",school:"dfsdf",department:"adasd",field:"sada",grade:2,completed:50,image:"asd",resume:"asda",startdate:"", enddate:"", isactive:true},
        {id:2,name:"dsad",confirmed:false,mail:"assad",school:"dfsdf",department:"adasd",field:"sada",grade:3,completed:30,image:"asd",resume:"asda",startdate:"", enddate:"", isactive:true}
      ]
      internService = moduleApp.get<InternService>(InternService);
    });

    it("Should return all interns",async()=>{
      jest.spyOn(internService, "findAll").mockResolvedValue(interns);
      const result =  await request(app.getHttpServer()).get('/interns').expect(200)
      expect(result.body).toEqual(interns)
    })

    it("Should return an intern",async()=>{
      jest.spyOn(internService, "findOne").mockResolvedValue(interns[0]);
      const result =  await request(app.getHttpServer()).get('/interns/1').expect(200)
      expect(result.body).toEqual(interns[0])
    })

    it("Should return all intern ids",async()=>{
      const internIds:InternEntity[] = []
      jest.spyOn(internService, "findAllForDetail").mockResolvedValue(internIds);
      const result =  await request(app.getHttpServer()).get('/interns/plan').expect(200)
      expect(result.body).toEqual(internIds)
    })

    it("Should create an intern",async()=>{
      jest.spyOn(internService, "create").mockResolvedValue(interns[0]);
      const result =  await request(app.getHttpServer()).post('/interns').expect(201)
      expect(result.body).toEqual(interns[0])
    })

    it("Should update complete column for an intern",async()=>{
      const updatedCompleted :{value:number} = {value:50}
      jest.spyOn(internService, "updateCompleted").mockResolvedValue(updatedCompleted);
      const result =  await request(app.getHttpServer()).put('/interns/completed/1').expect(200)
      expect(result.body).toEqual(updatedCompleted)
    })

    it("Should update an intern",async()=>{
      jest.spyOn(internService, "update").mockResolvedValue(interns[0]);
      const result =  await request(app.getHttpServer()).put('/interns/1').expect(200)
      expect(result.body).toEqual(interns[0])
    })

    it("Should delete an intern",async()=>{
      jest.spyOn(internService, "remove").mockResolvedValue(interns[0]);
      const result =  await request(app.getHttpServer()).delete('/interns/1').expect(200)
      expect(result.body).toEqual(interns[0])
    })
  })

  describe("Plan tests",()=>{
    let planService : PlanService
    let plans : PlanEntity[]

    beforeAll(()=>{
      plans = [
        {id:1,days:3,title:"plan1",description:"desc1",field:""},
        {id:2,days:4,title:"plan2",description:"desc2",field:""}
      ]
      planService = moduleApp.get<PlanService>(PlanService)
    })

    it("Should return all plans",async()=>{
      jest.spyOn(planService,'findAll').mockResolvedValue(plans)
      const result = await request(app.getHttpServer()).get("/plans").expect(200)
      expect(result.body).toEqual(plans)
    })

    it("Should return a plan",async()=>{
      jest.spyOn(planService,"findOne").mockResolvedValue(plans[0])
      const result = await request(app.getHttpServer()).get("/plans/1").expect(200)
      expect(result.body).toEqual(plans[0])
    })

    it("Should return all plan ids",async()=>{
      const planIds:PlanEntity[] =[]
      jest.spyOn(planService,'findAllForIntern').mockResolvedValue(planIds)
      const result = await request(app.getHttpServer()).get("/plans/intern").expect(200)
      expect(result.body).toEqual(planIds)
    })

    it("Should create a plan",async()=>{
      jest.spyOn(planService,'create').mockResolvedValue(plans[0])
      const result = await request(app.getHttpServer()).post("/plans").expect(201)
      expect(result.body).toEqual(plans[0])
    })

    it("Should update a plan",async()=>{
      jest.spyOn(planService,'update').mockResolvedValue(plans[0])
      const result = await request(app.getHttpServer()).put("/plans/1").expect(200)
      expect(result.body).toEqual(plans[0])
    })

    it("Should delete a plan",async()=>{
      jest.spyOn(planService,'remove').mockResolvedValue(plans[0])
      const result = await request(app.getHttpServer()).delete("/plans/1").expect(200)
      expect(result.body).toEqual(plans[0])
    })
  })

  describe("Detail tests",()=>{
    let detailService: DetailService
    let details: DetailEntity[]

    beforeAll(()=>{
      detailService = moduleApp.get<DetailService>(DetailService)
      details = [
        {id:1,intern:1,plan:1,startDate:"start",endDate:"end",done:true,point:50},
        {id:2,intern:2,plan:2,startDate:"start2",endDate:"end2",done:false,point:60}
      ]
    })

    it("Should return all details",async()=>{
      jest.spyOn(detailService,'findAll').mockResolvedValue(details)
      const result = await request(app.getHttpServer()).get("/details").expect(200)
      expect(result.body).toEqual(details)
    })

    it("Should return details for an intern",async()=>{
      jest.spyOn(detailService,'findOneIntern').mockResolvedValue(details)
      const result = await (await request(app.getHttpServer()).get("/details/1")).headers({"jwt":"123"}).expect(200)
      expect(result.body).toEqual(details)
    })

    it("Should create an detail for intern",async()=>{
      jest.spyOn(detailService,'createInternDetail').mockResolvedValue(details[0])
      const result = await request(app.getHttpServer()).post("/details/intern").expect(201)
      expect(result.body).toEqual(details[0])
    })

    it("Should create an detail for plan",async()=>{
      jest.spyOn(detailService,'createPlanDetail').mockResolvedValue(details[0])
      const result = await request(app.getHttpServer()).post("/details/plan").expect(201)
      expect(result.body).toEqual(details[0])
    })

    it("Should update a detail",async()=>{
      jest.spyOn(detailService,'update').mockResolvedValue(details[0])
      const result = await request(app.getHttpServer()).put("/details/1").expect(200)
      expect(result.body).toEqual(details[0])
    })

    it("Should delete a detail",async()=>{
      jest.spyOn(detailService,'remove').mockResolvedValue(details[0])
      const result = await request(app.getHttpServer()).delete("/details/1").expect(200)
      expect(result.body).toEqual(details[0])
    })
  })
});
