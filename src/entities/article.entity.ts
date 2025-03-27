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
  @Column({ nullable: true })
  summary: string;
  @Column({ default: false})
  readingNum: number;
  // 创建日期
  @CreateDateColumn()
  createTime: Date;
  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;

  @Column({default: ''})
  coverImage: string;
  // 关系分类
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
  // 关系标签
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
  
}