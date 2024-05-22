/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['internid', 'date'])
export class AttendanceEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  internid: number;

  @Column()
  date: string;

  @Column()
  value: boolean

  @Column({type:'text',nullable:true})
  note:string
}