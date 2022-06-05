import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
