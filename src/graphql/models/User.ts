import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserSetting } from './UserSetting';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field()
  @Column()
  username: string;

  @Column({ nullable: true }) //using column for typeorm and field for graphql
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;
}
