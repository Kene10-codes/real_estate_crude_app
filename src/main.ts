import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


configDotenv()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    // Swagger configuration
    const config = new DocumentBuilder()
    .setTitle('REAL ESTATE API')
    .setDescription('AA REAL ESTATE AND PROPERTY API DOCUMENTATION')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('real-estate')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);


  await app.listen(3001);
}
bootstrap();
