import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer/customer.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './typeorm/customer';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [{
     provide: 'CUSTOMER_SERVICE',
     useClass: CustomerService
  }, TypeOrmModule],
  controllers: [CustomerController]
})
export class CustomersModule {}
