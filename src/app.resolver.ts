import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query((returns) => String)
  getHello() {
    return 'hello world';
  }
}
