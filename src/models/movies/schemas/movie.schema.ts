import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
  },
  versionKey: false,
})
export class Movie {
  @ApiProperty({
    example: 'Blade Runner',
    description: 'The name of the movie',
  })
  @Prop({ required: [true, 'The name of the movie is required'] })
  name: string;

  @Prop({ required: [true, 'The title of the synopsis is required'] })
  titleSynopsis: string;

  @Prop({ required: [true, 'The synopsis is required'] })
  synopsis: string;

  @Prop({ required: [true, 'The director is required'] })
  director: string;

  @Prop({ required: [true, 'The genre is required'] })
  genres: string[];

  @Prop({ required: [true, 'The duration is required'] })
  duration: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
