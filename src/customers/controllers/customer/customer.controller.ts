import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Put(':id')
     @UseInterceptors(ClassSerializerInterceptor)
    updateCustomer(@Param('id') id: number, @Body() updateCustomer: SignUpDto) {
      return this.customerService.updateCustomer(id, updateCustomer)
    }


    @Delete(':id')
    deleteCusomter(@Param('id', ParseIntPipe) id: any) {
        return this.customerService.deleteCustomer(id)
    }
}
