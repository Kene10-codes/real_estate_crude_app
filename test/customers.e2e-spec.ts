import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/auth/enum/role.enum'


jest.setTimeout(30000); // Set a timeout of 30 seconds for all tests


describe("CustomersController e2e test", () => {

    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

       app = moduleFixture.createNestApplication()
       app.setGlobalPrefix('api')
       await app.init()
    })


    it("It should create a new user", async () => {
        return request(app.getHttpServer()).post('/api/auth/signup').send({
            name: "James ofe",
            email: 'mike9090@gmail.com',
            phone: '09164866732',
            password: 'j323hu2834hj',
            roles: [Role.Admin]
        }).expect(201)
    })

    it("it should return invalid credentials", async () => {
        return request(app.getHttpServer()).post('/api/auth/signup').send({
            name: "Francis Mike",
            email: 'Francis2000@mail.com',
            phone: '09164866732',
            password: 'j323hu2834hj',
            roles: [Role.User]
        }).expect(400)
    })
}) 