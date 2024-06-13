import { Module } from '@nestjs/common';
import { UserResolver } from 'src/users/UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserSettingResolver } from 'src/graphql/resolvers/UserSettingResolver';
import { UserSettingService } from './UserSettingService';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserService,
    UserSettingResolver,
    UserSettingService,
  ],
})
export class UsersModule {}
