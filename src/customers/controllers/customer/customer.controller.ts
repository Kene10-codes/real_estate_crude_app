import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from 'src/customers/dtos/signup.dto';
import { CustomerService } from 'src/customers/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(@Inject('CUSTOMER_SERVICE') private readonly customerService: CustomerService){}


    @Post('signup')
    @UsePipes(ValidationPipe)
    signupCustomer(@Body() signupCustomer: SignUpDto){
        this.customerService.signupCustomer(signupCustomer)
    }
}
