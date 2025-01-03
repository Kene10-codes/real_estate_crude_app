import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';

describe('CustomerController', () => {
  let controller: CustomerController;
  const id = 1

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    controller.deleteCusomter(id)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined(); 
  });
});
