import { IsNotEmpty } from "class-validator";
export class PropertyDTO {
    @IsNotEmpty()
    property_title: string;
    @IsNotEmpty()
    property_desc: string;
    @IsNotEmpty()
    price: string;
    url: string;
}