import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLoggerService } from 'src/services/logger.service';
import { errorResponse, successResponse } from 'src/utils/http-responses';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff, StaffDocument } from './schemas/staffs.schema';

@Injectable()
export class StaffsService {
  constructor(
    @InjectModel(Staff.name) private readonly staffModel: Model<StaffDocument>,
    private readonly appLoggerService: AppLoggerService,
  ) {
    this.appLoggerService.setContext('Staffs');
  }

  async create(createStaffDto: CreateStaffDto): Promise<any> {
    try {
      const staff = await this.staffModel.create(createStaffDto);

      this.appLoggerService.log(`The user created the staff ${staff._id}`);

      return successResponse(staff, 'Staff successfully created', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to create the staff', 400),
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const staffs = await this.staffModel.find().exec();

      return successResponse(staffs, 'Staffs successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get all staffs', 400),
      );
    }
  }

  async findOne(staffId: string): Promise<any> {
    try {
      const staff = await this.staffModel.findById({ _id: staffId }).exec();

      if (!staff) {
        throw new NotFoundException(`Staff #${staffId} not found`);
      }

      return successResponse(staff, 'Staffs successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get a staff', 400),
      );
    }
  }

  async update(staffId: string, updateStaffDto: UpdateStaffDto): Promise<any> {
    try {
      const staff = await this.staffModel.findByIdAndUpdate(
        { _id: staffId },
        updateStaffDto as any,
      );

      if (!staff) {
        throw new NotFoundException(`Staff #${staffId} not found`);
      }

      this.appLoggerService.log(`The user updated the staff ${staff._id}`);

      return successResponse(staff, 'Staffs successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get all staffs', 400),
      );
    }
  }

  async remove(staffId: string): Promise<any> {
    try {
      const staff = await this.staffModel.findByIdAndRemove(staffId);

      if (!staff) {
        throw new NotFoundException(`Staff #${staffId} not found`);
      }

      this.appLoggerService.log(
        `The user was eliminated the staff ${staff.name}`,
      );

      return successResponse(staff, 'Staffs successfully eliminated', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to eliminate the staff', 400),
      );
    }
  }
}
