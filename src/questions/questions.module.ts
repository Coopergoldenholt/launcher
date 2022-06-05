import { Module } from '@nestjs/common';
import { QuestionResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';

@Module({
  providers: [QuestionResolver, QuestionsService],
})
export class QuestionModule {}
