import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  // 分类ID
  @PrimaryGeneratedColumn()
  id: number;
  // 分类名称
  @Column({ length: 50 })
  categoryName: string;
  // 创建时间
  @CreateDateColumn()
  createTime: Date;
  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;
}