import { Resolver, Query } from '@nestjs/graphql';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionsService: QuestionsService) {}
  @Query(() => [Question], { name: 'questions' })
  getAll() {
    return this.questionsService.getAll();
  }
}
