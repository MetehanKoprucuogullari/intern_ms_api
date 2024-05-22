/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InternModule } from './intern/intern.module';
import { DocsModule } from './docs/docs.module';
import { PlanModule } from './plan/plan.module';
import { DetailModule } from './internDetail/detail.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { DocsEntity } from './docs/docs.entity';
import { PlanEntity } from './plan/plan.entity';
import { InternEntity } from './intern/intern.entity';
import { DetailEntity } from './internDetail/detail.entity';
import { AttendanceEntity } from './attendance/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'db_intern_management',
      entities: [UserEntity, PlanEntity, InternEntity, DetailEntity, AttendanceEntity,DocsEntity],
      synchronize: true,
      logging: true
    }),
    UserModule, 
    InternModule, 
    PlanModule, 
    DetailModule,
    AttendanceModule,
    DocsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
