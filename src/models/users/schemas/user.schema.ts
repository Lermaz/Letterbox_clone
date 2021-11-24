import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from 'src/models/movies/schemas/movie.schema';

export type UserDocument = User & mongoose.Document;

function arrayLimit(val) {
  return val.length <= 5;
}

@Schema({
  timestamps: {
    createdAt: 'createdAt',
  },
  versionKey: false,
})
export class User {
  @Prop({ required: [true, 'The username is required'] })
  username: string;

  @Prop()
  givenName: string;

  @Prop()
  familyName: string;

  @Prop({
    required: [true, 'The director is required'],
    validate: {
      validator: function (v: string) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          v,
        );
      },
      message: (props) => `${props.value} it is not a valid email`,
    },
  })
  email: string;

  @Prop()
  location: string;

  @Prop()
  biografy: string;

  @Prop({ required: [true, 'The pronoun is required'] })
  pronoun: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
    default: [],
  })
  favoriteFilms: Movie[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  following: User[];

  @Prop({ type: Number, default: 0 })
  films: number;

  @Prop({ type: Number, default: 0 })
  lists: number;

  @Prop({ type: Number, default: 0 })
  totalFollowing: number;

  @Prop({ type: Number, default: 0 })
  totalFollowers: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
