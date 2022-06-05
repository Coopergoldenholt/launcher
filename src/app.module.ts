import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { QuestionModule } from './questions/questions.module';
import { join } from 'path';
import { DateScalar } from './date.scalar';
import { UserModule } from './users/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    QuestionModule,
    UserModule,
    AuthModule,
  ],
  providers: [DateScalar, PrismaService],
})
export class AppModule {}
