import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/auth/enum/role.enum'
import { TypeOrmModule } from '@nestjs/typeorm';
import DB_INFO from '../src/database/';
import entities from '../src/typeorm/';

jest.setTimeout(300000)

describe("Authentication controller", () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,  
                TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: DB_INFO.port,
                username: DB_INFO.username,
                password: DB_INFO.password,
                database: DB_INFO.database,
                entities,
                synchronize: true
              })]
        }).compile()

       app = moduleFixture.createNestApplication()
       app.setGlobalPrefix('api')
       await app.init()
    })


    it('Authentication', (done) => {
        let auth = ''
      request(app.getHttpServer()).post('/api/auth/sign').send({
            phone: "08195902914",
            name: "Kingsley uwem",
            email: 'king0@gmail.com',
            password: 'j323hu2834hj',
        }).expect(201).end((err, res) => {
            console.log(res.headers)
            done()
        })
    })

    it("It should return all the customers", () => {
        return request(app.getHttpServer()).get('/api/customers').expect(200)
    })

   
})