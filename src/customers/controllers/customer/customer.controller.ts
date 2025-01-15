import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from '../../../auth/decorator/role.decorator';
import { Role } from '../../../auth/enum/role.enum';
import { JWTGuard } from '../../../auth/guards/jwt.guard';
import { RolesGuard } from '../../../auth/guards/role.guard';
import { SignUpDto } from '../../../customers/dtos/signup.dto';
import { CustomerService } from '../../../customers/services/customer/customer.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from 'src/customers/typeorm/customer';


@ApiTags('real-estate')
@Controller('customers')
export class CustomerController {
    constructor(@Inject('CUSTOMER_SERVICE') private readonly customerService: CustomerService){}

    @Get()
    @ApiOperation({ summary: 'Fetch customers' })
    @ApiResponse({ status: 201, description: 'Customers fetched successfully', type: Customer})
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @SkipThrottle()
    @Roles(Role.Admin)
    @UseGuards(JWTGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    fetchCustomers(){
       return this.customerService.getCustomers()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Fetch customer' })
    @ApiResponse({ status: 201, description: 'Customer fetched successfully', type: Customer})
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JWTGuard)
    getCustomer(@Param('id', ParseIntPipe) id: any){
       return this.customerService.getCustomer(id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update customer' })
    @ApiResponse({ status: 201, description: 'Customer updated successfully', type: Customer})
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UseGuards(JWTGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    updateCustomer(@Param('id') id: number, @Body() updateCustomer: SignUpDto) {
      return this.customerService.updateCustomer(id, updateCustomer)
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer' })
    @ApiResponse({ status: 201, description: 'Customer deleted successfully'})
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UseGuards(JWTGuard)
    deleteCusomter(@Param('id', ParseIntPipe) id: any) {
        return this.customerService.deleteCustomer(id)
    }
}
