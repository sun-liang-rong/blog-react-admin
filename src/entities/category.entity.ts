import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  // 分类ID
  @PrimaryGeneratedColumn()
  id: number;
  // 分类名称
  @Column({ length: 50 })
  name: string;
  // URL标识符
  @Column({ length: 100, unique: true})
  slug: string;
}