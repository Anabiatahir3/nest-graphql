import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import { User } from '../models/User';
import { mockUsers } from 'src/mockUsers';
import { mockSettingUsers } from 'src/mockSettingUsers';
import { UserSetting } from '../models/UserSetting';
import { CreateuserInput } from 'src/utils/CreateUserInput';

@Resolver((of) => User) //of=>User is a way of telling the resolver that user is the parent
export class UserResolver {
  @Query((returns) => [User])
  getUser() {
    return mockUsers;
  }
  @Query((returns) => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((user) => user.id == id);
  }
  // the resolved field might not be needed at all in the typeorm and mysql because in our db we already have the related data
  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true }) //resolving the settings field as it is a nested object
  getUserSettings(@Parent() user: User) {
    return mockSettingUsers.find((setting) => setting.userId === user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateuserInput) {
    const { username, displayName } = createUserData;
    const newUser = { username, displayName, id: ++mockUsers.length };
    mockUsers.push(newUser);
    console.log(newUser);
    return newUser;
  }
}
