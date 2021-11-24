import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { RolMovie } from './rolMovie.schema';

export type StaffDocument = Staff & mongoose.Document;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
  },
  versionKey: false,
})
export class Staff {
  @ApiProperty({
    example: 'Ridley Scott',
    description: 'The name of this person',
  })
  @Prop({ unique: true, required: [true, 'The name of the genre is required'] })
  name: string;

  @Prop({ type: String, default: null })
  avatar: string;

  @Prop({ required: [true, 'The description is required'] })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  rolMovie: RolMovie[];
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
