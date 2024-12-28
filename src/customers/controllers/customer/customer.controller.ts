import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { SignUpDto } from 'src/customers/dtos/signup.dto';
import { CustomerService } from 'src/customers/services/customer/customer.service';


@Controller('customers')
export class CustomerController {
    constructor(@Inject('CUSTOMER_SERVICE') private readonly customerService: CustomerService){}


    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    fetchCustomers(){
       return this.customerService.getCustomers()
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JWTGuard)
    getCustomer(@Param('id', ParseIntPipe) id: any){
       return this.customerService.getCustomer(id)
    }

    @Put(':id')
    @UseGuards(JWTGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    updateCustomer(@Param('id') id: number, @Body() updateCustomer: SignUpDto) {
      return this.customerService.updateCustomer(id, updateCustomer)
    }


    @Delete(':id')
    @UseGuards(JWTGuard)
    deleteCusomter(@Param('id', ParseIntPipe) id: any) {
        return this.customerService.deleteCustomer(id)
    }
}
