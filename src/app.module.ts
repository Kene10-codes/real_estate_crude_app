import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DB_INFO from './database';
import entities from './typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 50000,
      limit: 10,
    }]),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: DB_INFO.port,
    username: DB_INFO.username,
    password: DB_INFO.password,
    database: DB_INFO.database,
    entities,
    synchronize: true
  }), CustomersModule, AuthModule, PropertiesModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
