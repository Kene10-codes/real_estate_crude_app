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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
  providers: [AppService],
})
export class AppModule {}
