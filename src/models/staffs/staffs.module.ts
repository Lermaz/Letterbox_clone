import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './schemas/staffs.schema';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    ServicesModule,
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
  ],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
