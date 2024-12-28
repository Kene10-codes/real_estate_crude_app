import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/typeorm/customer';
import { JwtModule } from '@nestjs/jwt';
import { JWTInfo } from 'src/constants';
import { LocalStratergy } from './stratergies/local.stratergy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
  PassportModule,
  TypeOrmModule.forFeature([Customer]), 
  JwtModule.register({
    secret: JWTInfo.secret,
    signOptions: {expiresIn: JWTInfo.expires}
   
  })],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  }, LocalStratergy]
})
export class AuthModule {}
