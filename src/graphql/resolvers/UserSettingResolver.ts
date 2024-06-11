import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { mockSettingUsers } from 'src/mockSettingUsers';
import { CreateUserSettingInput } from 'src/utils/CreateUserSettingInput';
import { UserSetting } from '../models/UserSetting';

@Resolver()
export class UserSettingResolver {
  @Mutation((returns) => UserSetting)
  createUserSetting(
    @Args('createSetting') createSetting: CreateUserSettingInput,
  ) {
    const { receivedEmail, receivedNotifications, userId } = createSetting;
    const newSetting = { receivedEmail, receivedNotifications, userId };
    mockSettingUsers.push(newSetting);
    return newSetting;
  }
}
