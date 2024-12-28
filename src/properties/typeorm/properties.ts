import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PropertyType } from "../enums/enum.type";


@Entity()
export class Property {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'property_id'
    })
    id: number;


    @Column()
    property_title: string;

    @Column({
        name: 'property_description'
    })
    property_desc: string;

    @Column({
        name: 'total_price'
    })
    price: string;

    @Column()
    url: string;

    @Column({
        type: 'enum',
        enum: PropertyType,
        default: [PropertyType.RENT]
    })
    type: PropertyType;
}