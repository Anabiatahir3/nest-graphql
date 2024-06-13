import { Field, InputType } from '@nestjs/graphql';
import { CreateUserSettingInput } from './CreateUserSettingInput';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  userSetting?: CreateUserSettingInput;
}
