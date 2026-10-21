import { Entity , Column,PrimaryGeneratedColumn } from "typeorm"; 


@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userName:string


    @Column()
    passWord:string

}
