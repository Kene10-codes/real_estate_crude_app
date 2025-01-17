import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from '../../guards/jwt.guard';
import { LocalGuard } from '../../../auth/guards/local.guard';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { SignUpDto } from '../../../customers/dtos/signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('real-estate')
@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService){}


    @Post('signup')
    signup(@Body() signupDto: SignUpDto) {
        return  this.authService.signup(signupDto)
    }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: Request){
        return req.user;
    }

    @Get('profile')
    @UseGuards(JWTGuard)
    async getProfile(@Req() req: Request){
        return req.user
    }
}
