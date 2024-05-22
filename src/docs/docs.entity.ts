/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DocsEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  internid: number;

  @Column()
  accForm: string;

  @Column()
  criRecord: string

  @Column()
  educDoc: string

  @Column()
  idRegister: string 
}