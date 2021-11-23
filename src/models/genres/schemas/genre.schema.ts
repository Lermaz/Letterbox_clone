import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
  },
  versionKey: false,
})
export class Genre {
  @ApiProperty({
    example: 'Drama',
    description: 'The name of the genre',
  })
  @Prop({ unique: true, required: [true, 'The name of the genre is required'] })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
