//@ts-nocheck

import { Injectable } from '@nestjs/common';
import { Question } from './entities/question.entity';

const questions: Partial<Question>[] = [
  {
    id: 1,
    content: 'Question 1',
    answer: 'Answer 1',
    answerNumber: 1.1,
    createdAt: new Date(12312324),
    updatedAt: new Date(12312324),
  },
  {
    id: 2,
    content: 'Question 2',
    answer: 'Answer 2',
    answerNumber: 2.2,
    createdAt: new Date(23420342),
    updatedAt: new Date(23420342),
  },
];

@Injectable()
export class QuestionsService {
  getAll() {
    return questions;
  }
}
