import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

export class CreateRolMovieDto {
  @IsMongoId({ message: 'The movie field must be a valid Mongo id' })
  @IsNotEmpty({ message: 'The movie field must not be empty' })
  @ApiProperty()
  movie: string;

  @IsArray({ message: 'The rols must be an array' })
  @ArrayNotEmpty({ message: 'The rols are mandatory' })
  @ArrayMinSize(1, { message: 'At least one rol must come' })
  @ArrayUnique({ message: 'Some of the rols are duplicated' })
  @ApiProperty()
  rol: string[];
}
