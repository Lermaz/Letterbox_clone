import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString({ message: 'The name of the movie must be a text string' })
  @IsNotEmpty({ message: 'The name of the movie is required' })
  @ApiProperty()
  readonly name: string;
}
