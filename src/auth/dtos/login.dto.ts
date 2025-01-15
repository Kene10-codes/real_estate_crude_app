import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: "example@gmail.com", description: 'Email address' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiHideProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}