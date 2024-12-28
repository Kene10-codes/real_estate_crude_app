import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer/customer.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './typeorm/customer';
import { JWTStratergy } from 'src/auth/stratergies/jwt.stratergy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule ,TypeOrmModule.forFeature([Customer])],
  providers: [{
     provide: 'CUSTOMER_SERVICE',
     useClass: CustomerService
  }, TypeOrmModule, JWTStratergy],
  controllers: [CustomerController]
})
export class CustomersModule {}
