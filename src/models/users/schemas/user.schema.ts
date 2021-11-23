import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
