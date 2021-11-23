import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ModelsModule } from 'src/models/models.module';
import { ServicesModule } from 'src/services/services.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServicesModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/letterbox-clone'),
    ModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
