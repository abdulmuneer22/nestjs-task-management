import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import * as crypt from 'bcrypt'
import { Task } from '../tasks/tasks.entity'


@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[]


    async validatePassword(password: string): Promise<boolean> {
        const hash = await crypt.hash(password, this.salt)
        return hash === this.password
    }
}