import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Property {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'property_id'
    })
    id: number;


    @Column({
        name: 'property_tile'
    })
    property: string;

    @Column({
        name: 'property_description'
    })
    property_desc: string;

    @Column({
        name: 'total_price'
    })
    price: string;
}