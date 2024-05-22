/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InternEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique:true})
  mail:string

  @Column({nullable:true})
  confirmed:boolean

  @Column()
  grade: number;

  @Column()
  school: string;

  @Column()
  department: string;

  @Column()
  field: string;

  @Column({nullable:true, type:'numeric'})
  completed: number;

  @Column({nullable:true, type:'text'})
  image: string;

  @Column({nullable:true, type:'text'})
  resume: string;

  @Column()
  startdate : string;

  @Column()
  enddate: string;

  @Column({nullable:true})
  isactive: boolean;
}