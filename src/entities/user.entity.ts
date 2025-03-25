import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  // 用户名
  @Column({ length: 100 })
  username: string;

  // 密码
  @Column({ length: 100 })
  password: string;
  // 头像
  @Column()
  avatar: string;
  // 个人简介
  @Column('text')
  bio: string;
  // 用户社交媒体链接
  @Column('json')
  socialLinks: Array<{ name: string; url: string }>;
  // 电子邮箱
  @Column({ length: 100, unique: true})
  email: string;
}