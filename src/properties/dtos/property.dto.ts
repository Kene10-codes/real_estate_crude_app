import { IsNotEmpty } from "class-validator";
import { PropertyType } from "../enums/enum.type";

export class PropertyDTO {
    @IsNotEmpty()
    property_title: string;
    @IsNotEmpty()
    property_desc: string;
    @IsNotEmpty()
    price: string;
    url: string;
}