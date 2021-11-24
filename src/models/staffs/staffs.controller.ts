import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './schemas/staffs.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('staffs')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: 'Create staff' })
  async create(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all staffs' })
  async findAll(): Promise<Staff[]> {
    return this.staffsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one staff' })
  async findOne(@Param('id') staffId: string): Promise<Staff> {
    return this.staffsService.findOne(staffId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one genre' })
  async update(
    @Param('id') staffId: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    return this.staffsService.update(staffId, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one staff' })
  async remove(@Param('id') staffId: string): Promise<Staff> {
    return this.staffsService.remove(staffId);
  }
}
