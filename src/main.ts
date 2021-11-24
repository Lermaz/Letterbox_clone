import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app/app.module';
import { AppLoggerService } from './services/logger.service';
import { addSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService(),
  });

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: 'Too many request, please try again after an hour',
  });

  app.use(cors());
  app.use(compression());
  app.use(express.urlencoded({ extended: false, limit: 140 * 1024 * 1024 }));
  app.use(express.json({ limit: 140 * 1024 * 1024 }));
  app.use(helmet());
  app.use(limiter);

  addSwagger(app);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
