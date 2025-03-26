import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  // 标签ID
  id: number;
  // 标签名称
  @Column({ length: 50})
  name: string;
  // 标签颜色代码（十六进制）
  @Column({ length: 7 })
  color: string;

  @CreateDateColumn()
  createTime: Date ;

  @UpdateDateColumn()
  updateTime: Date ;
}