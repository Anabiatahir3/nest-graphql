import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { CreateuserInput } from 'src/utils/CreateUserInput';
import { UpdateUserInput } from 'src/utils/UpdateUserInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserSetting)
    private userSettingRepo: Repository<UserSetting>,
  ) {}

  getUser() {
    return this.userRepository.find({ relations: ['userSetting'] });
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['userSetting'],
    });
  }

  async createUser(createUserInput: CreateuserInput): Promise<User> {
    const { username, displayName, userSetting } = createUserInput;
    const newUser = this.userRepository.create({
      username,
      displayName,
      userSetting,
    });
    return this.userRepository.save(newUser); //because of using cascade=true we dont have to manually set the data for userSetting in the userSetting table
  }

  async deleteUser(userId: number) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('no user found of this id');
    }
    await this.userRepository.remove(user);
    if (user.userSetting) {
      await this.userSettingRepo.remove(user.userSetting);
    }
    return user;
  }

  async updateUser(id: number, updateUser: UpdateUserInput) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userSetting'],
    });
    if (!user) {
      throw new NotFoundException('No user found');
    }

    // Update user fields
    if (updateUser.displayName) {
      user.displayName = updateUser.displayName;
    }
    if (updateUser.username) {
      user.username = updateUser.username;
    }

    if (updateUser.userSetting) {
      if (user.userSetting) {
        user.userSetting.receivedEmail = updateUser.userSetting?.receivedEmail;
        user.userSetting.receivedNotification =
          updateUser.userSetting?.receivedNotification;
        await this.userSettingRepo.save(user.userSetting);
      } else {
        const newUserSetting = this.userSettingRepo.create(
          updateUser.userSetting,
        );
        user.userSetting = await this.userSettingRepo.save(newUserSetting);
      }
    }

    await this.userRepository.save(user);

    const updatedUser = await this.userRepository.findOne({
      where: { id },
      relations: ['userSetting'],
    });
    return updatedUser;
  }
}
