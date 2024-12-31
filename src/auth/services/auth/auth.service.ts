import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Customer as CustomerEntity} from '../../../customers/typeorm/customer'
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/customers/dtos/signup.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { checkPassword, encodePassword } from 'src/auth/util/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
 constructor(
    @InjectRepository(CustomerEntity) 
    private readonly customerRepository: Repository<CustomerEntity>,
    private readonly jwtService: JwtService){}


 async loginUser(loginDto: LoginDto): Promise<{token: any}>{
    const {email, password} = loginDto
   const user = await this.customerRepository.findOneBy({email})
   if(user) {
      const verifyUser = await checkPassword(password, user.password)
      if(verifyUser) {
         return {token: await this.jwtService.signAsync({email})}
      } else {
        throw new UnauthorizedException("Invalid credentials")
      }
   } else {
    throw new UnauthorizedException("User not found!!!")
   }
}


 async signup(customerDto: SignUpDto): Promise<{token: any}>{
    const {email, roles} = customerDto
   const  password = await encodePassword(customerDto.password)
   const customer =  this.customerRepository.create({...customerDto, password})
   if(customer) {
    const isCustomer = await this.customerRepository.findOne({ where: {email}})
    if(isCustomer){
        throw new BadRequestException("User already exists!!!")
    } else {
       await this.customerRepository.save(customer)
       return {token:  await this.jwtService.signAsync({email, roles})}
    }
   } else {
    throw new BadRequestException()
   }
          
}

}
