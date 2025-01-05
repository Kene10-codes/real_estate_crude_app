import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Role } from '../../../auth/enum/role.enum';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from 'src/customers/typeorm/customer';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
        provide: getRepositoryToken(Customer),
        useClass: Repository
      },
        {
          provide: "AUTH_SERVICE",
          useClass: AuthService,
          useValue: { 
            signup: jest.fn().mockResolvedValue({
              token: 'some-token'
            })
            
          }
        },
        JwtService,
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
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
      try {
        const result = await controller.signup({
          name: 'Kenechukwu Jame',
          email: 'james5999@gmail.com',
          phone: '09164866732',
          password: 'j323hu2834hj',
          roles: [Role.Admin],
        });
  
        expect(result).toEqual({ token: 'some-token' });
        expect(service.signup).toHaveBeenCalledWith({
          name: 'Kenechukwu Jame',
          email: 'james5999@gmail.com',
          phone: '09164866732',
          password: 'j323hu2834hj',
          roles: [Role.Admin],
        });
      } catch(e){
        console.log(e);
      }
    });
  });
});