import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Role } from '../../../auth/enum/role.enum';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../../../customers/typeorm/customer';
import { JwtService } from '@nestjs/jwt';
import { encodePassword } from 'src/auth/util/bcrypt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let customerRepository: Repository<Customer>
 let CUSTOMER_REPOSITORY_TOKEN = getRepositoryToken(Customer)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
        provide: CUSTOMER_REPOSITORY_TOKEN,
        useValue: {
          create: jest.fn(),
          find: jest.fn(),
          findOneBy: jest.fn(),
          findOne: jest.fn(),
          save: jest.fn(),
        
        },
      },
        JwtService,
      ]
    }).compile()
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    customerRepository = module.get<Repository<Customer>>(CUSTOMER_REPOSITORY_TOKEN)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('auth service should be defined',  () => {
    expect(service).toBeDefined();
  })

  describe('signup', () => {
    it('should return a valid token', async () => {
      jest.spyOn(service, 'signup').mockImplementationOnce(() => {
        throw new BadRequestException()
      })

      it('it should create correct customerrepository', async () => {
     try {
      await service.signup({
        name: "James ofe",
        email: 'james5999@gmail.com',
        phone: '09164866732',
        password: 'j323hu2834hj',
        roles: [Role.Admin],
      });

      expect(customerRepository.create).toHaveBeenCalledWith({
        name: "James ofe",
        email: 'james5999@gmail.com',
        phone: '09164866732',
        password: 'j323hu2834hj',
        roles: [Role.Admin],
      }) 
     } catch(e) {
      console.log(e)
     }
      })
    });
  });
});