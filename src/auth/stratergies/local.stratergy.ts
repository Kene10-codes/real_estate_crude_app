import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";
import { LoginDto } from "../dtos/login.dto";

export class LocalStratergy extends PassportStrategy(Strategy) {
constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService){
    super({
        usernameField: 'email'
    })
}

validate(email: string, password: string){
    const loginInfo = {email, password}
    const user =  this.authService.loginUser(loginInfo)
    if(!user) {
        throw new UnauthorizedException("User is not valid")
    }
    return user; 
}

}