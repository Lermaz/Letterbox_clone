import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString({ message: 'The name of the movie must be a text string' })
  @IsNotEmpty({ message: 'The name of the movie is required' })
  @ApiProperty()
  readonly name: string;

  @IsString({ message: 'The title of synopsis must be a text string' })
  @IsNotEmpty({ message: 'The title of synopsis is required' })
  @ApiProperty()
  readonly titleSynopsis: string;

  @IsString({ message: 'The synopsis must be a text string' })
  @IsNotEmpty({ message: 'The synopsis is required' })
  @ApiProperty()
  readonly synopsis: string;

  @IsMongoId({ message: 'The director must be a valid Mongo id' })
  @IsNotEmpty({ message: 'The director is required' })
  @ApiProperty()
  readonly director: string;

  @IsArray({ message: 'The genres must be an array' })
  @ArrayNotEmpty({ message: 'The genres is required' })
  @ArrayMinSize(1, { message: 'At least one genre must come' })
  @ArrayUnique({ message: 'Some of the genres are duplicated' })
  @ApiProperty()
  readonly genres: string[];

  @IsInt({ message: 'The duration of the movie must be a number' })
  @Min(0, {
    message: 'The duration of the movie must be greater than or equal to 0',
  })
  @ApiProperty()
  readonly duration: number;
}
