import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The name of the user must be a text string' })
  @IsNotEmpty({ message: 'The name of the user is required' })
  @ApiProperty()
  readonly username: string;

  @IsString({ message: 'The given name must be a text string' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly givenName: string;

  @IsString({ message: 'The family name must be a text string' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly familyName: string;

  @IsString({ message: 'The email must be a text string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, {
    message: 'The email entered is not a valid email',
  })
  @ApiProperty()
  email: string;

  @IsString({ message: 'The location must be a text string' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly location: string;

  @IsString({ message: 'The biografy must be a text string' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly biografy: string;

  @IsString({ message: 'The pronoun must be a text string' })
  @IsNotEmpty({ message: 'The pronoun is required' })
  @ApiProperty()
  readonly pronoun: string;
}
