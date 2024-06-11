import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateUserSettingInput {
  @Field((type) => Int)
  userId: number;

  @Field({ nullable: true, defaultValue: false })
  receivedEmail: boolean;

  @Field({ nullable: true, defaultValue: false })
  receivedNotifications: boolean;
}
