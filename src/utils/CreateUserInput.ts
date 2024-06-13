import { InputType, Field } from '@nestjs/graphql';
import { CreateUserSettingInput } from './CreateUserSettingInput';

@InputType()
export class CreateuserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;

  @Field(() => CreateUserSettingInput, { nullable: true })
  userSetting: CreateUserSettingInput;
}
