import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { mockSettingUsers } from 'src/mockSettingUsers';
import { CreateUserSettingInput } from 'src/utils/CreateUserSettingInput';
import { UserSetting } from '../models/UserSetting';
import { UserSettingService } from 'src/users/UserSettingService';

@Resolver()
export class UserSettingResolver {
  constructor(private userSettingSerive: UserSettingService) {}
  @Mutation((returns) => UserSetting)
  async createUserSetting(
    @Args('createSetting') createSetting: CreateUserSettingInput,
  ) {
    const { receivedEmail, receivedNotifications, userId } = createSetting;
    const newSetting = { receivedEmail, receivedNotifications, userId };
    return await this.userSettingSerive.createUserSetting(newSetting);
  }
}
