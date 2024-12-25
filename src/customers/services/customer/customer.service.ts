import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/customers/dtos/signup.dto';
import { Customer as CustomerEntity} from 'src/customers/typeorm/customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
     

    constructor(@InjectRepository(CustomerEntity) private readonly customerReposity: Repository<CustomerEntity>){}


    async signupCustomer(customerDto: SignUpDto){
        console.log(customerDto)
        
          

    }
}
