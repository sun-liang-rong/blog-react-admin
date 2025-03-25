import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  // 标签ID
  id: number;
  // 标签名称
  @Column({ length: 50})
  name: string;
  // URL标识符
  @Column({ length: 100, unique: true })
  slug: string;
  // 标签颜色代码（十六进制）
  @Column({ length: 7 })
  color: string;
}