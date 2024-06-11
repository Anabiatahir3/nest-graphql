import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateuserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;
}
