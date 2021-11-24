import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRolMovieDto } from './create-rolMovie.dto';

export class CreateStaffDto {
  @IsString({ message: 'The name of this person must be a text string' })
  @IsNotEmpty({ message: 'The name of this person is required' })
  @ApiProperty()
  readonly name: string;

  @IsString({ message: 'The avatar must be a text string' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly avatar: string;

  @IsString({ message: 'The description must be a text string' })
  @IsNotEmpty({ message: 'The description is required' })
  @ApiProperty()
  readonly description: string;

  @IsArray({ message: 'The array must be an arrangement' })
  @ValidateNested()
  @Type(() => CreateRolMovieDto)
  @ApiProperty()
  readonly rolMovie: CreateRolMovieDto[];
}
