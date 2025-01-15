import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Role } from "src/auth/enum/role.enum";

export class SignUpDto {
    @ApiProperty({ example: "John Doe", description: 'The name of the customer' })
    @IsNotEmpty()
    @MinLength(6)
    name: string;
    @ApiProperty({ example: "example@gmail.com", description: 'Email address' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @ApiProperty({ example: "08168790123", description: 'Phone Number' })
    phone: string;
    @ApiProperty({ example: "securepassword", description: 'Password' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @ApiProperty({ example: "user", description: 'The role' })
    roles: Role[]

} 