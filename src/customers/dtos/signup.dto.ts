import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @MinLength(6)
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}