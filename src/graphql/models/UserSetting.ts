import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserSetting {
  @Field((type) => Int)
  userId: number;

  @Field({ defaultValue: false })
  receivedNotifications: boolean;

  @Field({ defaultValue: false })
  receivedEmail: boolean;
}
