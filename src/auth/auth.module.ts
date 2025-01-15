import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/typeorm/customer';
import { JwtModule } from '@nestjs/jwt';
import { LocalStratergy } from './stratergies/local.stratergy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStratergy } from './stratergies/jwt.stratergy';

@Module({
  imports: [
  ConfigModule,
  PassportModule,
  TypeOrmModule.forFeature([Customer]), 
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: "2d" }
    })
  })],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  }, LocalStratergy, JWTStratergy]
})
export class AuthModule {}
