import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query((returns) => String)
  hello() {
    return 'Hello World!';
  }
}
