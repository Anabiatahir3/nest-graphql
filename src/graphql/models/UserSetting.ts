import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'settings' })
@ObjectType()
export class UserSetting {
  @Field((type) => Int)
  @PrimaryColumn()
  userId: number;

  @Column()
  @Field({ defaultValue: false })
  receivedNotifications: boolean;

  @Column()
  @Field({ defaultValue: false })
  receivedEmail: boolean;
}
