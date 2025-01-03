import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Role } from "src/auth/enum/role.enum";

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
    roles: Role[]

} 