/* eslint-disable prettier/prettier */
import { PlanEntity } from '../plan/plan.entity';
import { DetailController } from './detail.controller';
import { DetailEntity } from './detail.entity';
import { DetailService } from './detail.service';
import { Repository, Connection } from 'typeorm';
import { InternEntity } from '../intern/intern.entity';
import  { Request } from 'express'

describe('DetailController', () => {
  let detailController: DetailController;
  let detailService: DetailService;
  let detailRepository: Repository<DetailEntity>;
  let planRepository: Repository<PlanEntity>;
  let internRepository: Repository<InternEntity>;
  let req : Request
  let detailConnection: Connection; 

  beforeEach(() => {
    detailService = new DetailService(
      detailRepository,
      internRepository,
      planRepository,
      detailConnection,
    );
    detailController = new DetailController(detailService);
    req = {
      headers: {},
      cookies: { jwt: 'your_jwt_token_here' }, // Provide a valid JWT token here
    } as Request;
  });

  describe('getAllDetails', () => {
    it('Should return an array of details', async () => {
      const details: DetailEntity[] = [
        {
          id: 1,
          intern: 1,
          plan: 1,
          startDate: '2023-07-20',
          endDate: '2023-07-25',
          done: true,
          point: 50,
        },
        {
          id: 2,
          intern: 2,
          plan: 2,
          startDate: '2023-07-28',
          endDate: '2023-08-03',
          done: false,
          point: 60,
        },
      ];

      jest.spyOn(detailService, 'findAll').mockResolvedValue(details);

      const result = await detailController.getAllDetails(req);
      expect(result).toEqual(details);
    });
  });

  describe('getDetailById', () => {
    it('Should return details by internId', async () => {
      const details: DetailEntity[] = [
        {
          id: 1,
          intern: 1,
          plan: 1,
          startDate: '2023-07-20',
          endDate: '2023-07-25',
          done: true,
          point: 50,
        },
        {
          id: 2,
          intern: 2,
          plan: 2,
          startDate: '2023-07-28',
          endDate: '2023-08-03',
          done: false,
          point: 60,
        },
      ];

      jest.spyOn(detailService, 'findOneIntern').mockResolvedValue(details);

      const result = await detailController.getDetailById(req,'2');
      expect(result).toEqual(details);
    });
  });

  describe('createInternDetail', () => {
    it('Should create a new detail', async () => {
      const detail: DetailEntity = {
        id: 1,
        intern: 1,
        plan: 1,
        startDate: '2023-07-20',
        endDate: '2023-07-25',
        done: true,
        point: 50,
      };

      jest.spyOn(detailService, 'createInternDetail').mockResolvedValue(detail);
      
      const resultIntern = await detailController.createInternDetail(req,detail);

      expect(resultIntern).toEqual(detail);
    });
  });

  describe('createPlanDetail', () => {
    it('Should create a new detail', async () => {
      const detail: DetailEntity = {
        id: 1,
        intern: 1,
        plan: 1,
        startDate: '2023-07-20',
        endDate: '2023-07-25',
        done: true,
        point: 50,
      };

      jest.spyOn(detailService, 'createPlanDetail').mockResolvedValue(detail);

      const resultPlan = await detailController.createPlanDetail(req,detail);

      expect(resultPlan).toEqual(detail);
    });
  });
 
  describe('updateDetail',()=>{
    it("Should update an item of details",async()=>{
        const detail: DetailEntity = {
            id: 2,
            intern: 2,
            plan: 2,
            startDate: '2023-07-28',
            endDate: '2023-08-03',
            done: false,
            point: 60,
        }

        jest.spyOn(detailService,"update").mockResolvedValue(detail)

        const updated = await detailController.updateDetail(req,"1",detail)
        expect(updated).toEqual(detail)
    })
  });

  describe("deleteDetail",()=>{
    it("Should delete an item of details",async()=>{
        const detail :DetailEntity = {
            id: 2,
            intern: 2,
            plan: 2,
            startDate: '2023-07-28',
            endDate: '2023-08-03',
            done: false,
            point: 60,
        }

        jest.spyOn(detailService, "remove").mockResolvedValue(detail)

        const deleted = await detailController.deleteDetail(req,"2")
        expect(deleted).toEqual(detail)
    })
  })
});
