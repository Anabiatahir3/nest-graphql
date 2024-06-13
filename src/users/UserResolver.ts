import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import { User } from '../graphql/models/User';
import { mockUsers } from 'src/mockUsers';
import { mockSettingUsers } from 'src/mockSettingUsers';
import { UserSetting } from '../graphql/models/UserSetting';
import { CreateuserInput } from 'src/utils/CreateUserInput';
import { UserService } from './UserService';
import { UserSettingService } from './UserSettingService';

@Resolver((of) => User) //of=>User is a way of telling the resolver that user is the parent
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}

  @Query((returns) => [User])
  getUser() {
    return this.userService.getUser();
  }
  @Query((returns) => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }
  // the resolved field might not be needed at all in the typeorm and mysql because in our db we already have the related data as we are using relational db
  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true }) //resolving the settings field as it is a nested object
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingService.getUserSetting(user.id);
  // }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateuserInput) {
    return this.userService.createUser(createUserData);
  }
}
