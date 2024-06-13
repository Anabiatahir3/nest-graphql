import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'settings' })
@ObjectType()
export class UserSetting {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field({ defaultValue: false })
  receivedNotification: boolean;

  @Column()
  @Field({ defaultValue: false })
  receivedEmail: boolean;

  @OneToOne(() => User, (user) => user.userSetting)
  user: User;
}
