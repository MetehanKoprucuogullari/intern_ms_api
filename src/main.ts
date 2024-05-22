/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(cookieParser())
  app.enableCors({
    origin:'http://localhost:5000',
    credentials:true
  })

  await app.listen(5000);
}
bootstrap();
