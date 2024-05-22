/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  @Column()
  password: string;

  @Column()
  role: string

  @Column()
  field: string
}