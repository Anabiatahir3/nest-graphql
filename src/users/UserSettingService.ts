import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { CreateUserSettingInput } from 'src/utils/CreateUserSettingInput';
import { Repository } from 'typeorm';
import { User } from 'src/graphql/models/User';
import { UserService } from './UserService';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepo: Repository<UserSetting>,

    @InjectRepository(User) private userRepo: Repository<User>,
    private userService: UserService,
  ) {}
  async getUserSetting(userId: number) {
    return await this.userSettingRepo.findOneBy({ userId });
  }
  async createUserSetting(createUserSetting: CreateUserSettingInput) {
    const user = await this.userService.getUserById(createUserSetting.userId);
    if (!user) {
      throw new NotFoundException('No user of this id found');
    }
    const newUserSetting = await this.userSettingRepo.save(createUserSetting);
    user.settings = newUserSetting;
    await this.userRepo.save(user);
    return newUserSetting;
  }
}
