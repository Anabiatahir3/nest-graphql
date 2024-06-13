import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { CreateuserInput } from 'src/utils/CreateUserInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUser() {
    return this.userRepository.find({ relations: ['settings'] });
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  async createUser(createUser: CreateuserInput) {
    const user = new User();
    user.displayName = createUser.displayName;
    user.username = createUser.username;

    const newUser = this.userRepository.save(user);
    return newUser;
  }
}
