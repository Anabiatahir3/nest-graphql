import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingInput {
  @Field({ defaultValue: false })
  receivedEmail: boolean;

  @Field({ defaultValue: false })
  receivedNotification: boolean;
}
