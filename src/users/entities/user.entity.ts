import { Field, Int, ObjectType } from '@nestjs/graphql';
import FieldError from '../../global-entities/field-error.entity';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'User id', nullable: false })
  id: number;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  authToken?: string;

  password?: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
