import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend applications
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost'], // Camera and timelapse frontends, and gateway
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Configure for handling large base64 images
  app.use(json({ limit: '50mb' }));

  // Start the server
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Timelapse Service is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
