import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Entity()
export class Article {
  // 文章ID
  @PrimaryGeneratedColumn()
  id: number;
  // 文章标题
  @Column({ length: 200 })
  title: string;
  // 文章内容
  @Column('text')
  content: string;
  // 封面图片URL
  @Column({ nullable: true })
  coverImage: string;
  // 是否置顶
  @Column({ default: false})
  isPinned: boolean;
  // 创建日期
  @CreateDateColumn()
  publishDate: Date;
  // email
  @Column({ length: 100, unique: true })
  email: string;
  // 关系分类
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
  // 关系标签
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
  // 更新时间
  @UpdateDateColumn()
  updatedAt: Date;
}