import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { DateScalar } from 'src/date.scalar';

@ObjectType()
export class Question {
  @Field(() => Int, { description: 'Question id', nullable: false })
  id: number;

  @Field()
  content: string;

  @Field({ nullable: true })
  answer: string;

  @Field(() => Float, { nullable: true })
  answerNumber: number;

  @Field()
  createdAt: DateScalar;

  @Field()
  updatedAt: DateScalar;
}
