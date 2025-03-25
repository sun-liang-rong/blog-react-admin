import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Project {
  // 项目ID
  @PrimaryGeneratedColumn()
  id: number;
  // 项目名称
  @Column({ length: 100 })
  name: string;
  // 项目描述
  @Column({ type: 'text' })
  description: string;
  // 封面图URL
  @Column({ nullable: true })
  coverImage: string;
  // 项目开始日期
  @Column({ type: 'date' })
  startDate: Date;
  // 项目结束日期
  @Column({ type: 'date', nullable: true })
  endDate: Date;
  // 项目访问URL
  @Column({ length: 200, nullable: true})
  projectUrl: string;
  // 项目源代码URL
  @Column({ length: 200, nullable: true })
  sourceCodeUrl: string;
  // 创建时间
  @CreateDateColumn()
  createdAt: Date;
  // 使用的技术栈列表
  @Column({ type: 'simple-array'})
  techStack: string[];
}