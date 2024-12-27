import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Customer {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'customer_id'
    })
   id: number;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   phone: string;

   @Column({
    nullable: false
   })
   password: string;
}