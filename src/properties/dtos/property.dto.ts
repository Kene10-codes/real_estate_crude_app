import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class PropertyDTO {
    @ApiProperty({ example: "5 bedroom block of flats", description: 'The title of the property' })
    @IsNotEmpty()
    property_title: string;
    @ApiProperty({ example: "5 bedroom block of flats, POP, fenced compound etc", description: 'The description of the property' })
    @IsNotEmpty()
    property_desc: string;
    @ApiProperty({ example: "5,000,000", description: 'The price of the property' })
    @IsNotEmpty()
    price: string;
    @ApiProperty({ example: "Photo URL", description: 'The photos URL of the property' })
    url: string;
}