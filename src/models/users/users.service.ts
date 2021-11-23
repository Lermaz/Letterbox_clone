import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLoggerService } from 'src/services/logger.service';
import { errorResponse, successResponse } from 'src/utils/http-responses';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly appLoggerService: AppLoggerService,
  ) {
    this.appLoggerService.setContext('Users');
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userModel.create(createUserDto);

      this.appLoggerService.log(`The user created the user ${user._id}`);

      return successResponse(user, 'User successfully created', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to create the user', 400),
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const users = this.userModel.find().exec();

      return successResponse(users, 'Users successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get all users', 400),
      );
    }
  }

  async findOne(userId: string): Promise<any> {
    try {
      const user = await this.userModel.findById({ _id: userId }).exec();

      if (!user) {
        throw new NotFoundException(`User #${userId} not found`);
      }

      return successResponse(user, 'User successfully obtained', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to get a user', 400),
      );
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        { _id: userId },
        updateUserDto,
      );

      if (!user) {
        throw new NotFoundException(`User #${userId} not found`);
      }

      return successResponse(user, 'User successfully updated', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to update the user', 400),
      );
    }
  }

  async remove(userId: string): Promise<any> {
    try {
      const user = await this.userModel.findByIdAndRemove(userId);

      if (!user) {
        throw new NotFoundException(`User #${userId} not found`);
      }

      return successResponse(user, 'User successfully eliminated', 200);
    } catch (error) {
      this.appLoggerService.error(error);

      throw new BadRequestException(
        errorResponse(error, 'Failed to eliminate the user', 400),
      );
    }
  }
}
