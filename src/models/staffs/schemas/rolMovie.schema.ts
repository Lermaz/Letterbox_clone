import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from 'src/models/movies/schemas/movie.schema';

export type RolMovieDocument = RolMovie & mongoose.Document;

export const validRolType = {
  values: [
    'Director',
    'Producer',
    'Writers',
    'Editor',
    'Cinematography',
    'Production Design',
    'Art Direction',
    'Visual Effects',
    'Composer',
    'Sound',
    'Costumes',
    'Make-Up',
  ],
  message: '{VALUE no es un tipo permitido}',
};

@Schema({
  timestamps: {
    createdAt: 'createdAt',
  },
  versionKey: false,
})
export class RolMovie {
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    default: [],
  })
  movie: Movie[];

  @Prop({
    type: Array,
    items: {
      type: String,
      enum: validRolType,
    },
    default: [],
  })
  rol: string[];
}

export const RolMovieSchema = SchemaFactory.createForClass(RolMovie);
