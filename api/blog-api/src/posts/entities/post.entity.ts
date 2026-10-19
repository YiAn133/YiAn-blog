import {
  Column, CreateDateColumn, DeleteDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  // 表示URL的别名 由标题生成 用于网页路由访问
  @Column({ length: 200, unique: true })
  slug: string;

  @Column({ type: 'longtext' })
  content: string;

  // 表示文章的状态是编辑 还是 已发布
  @Column({ type: 'varchar', length: 20, default: PostStatus.DRAFT })
  status: PostStatus;

  @Column({ type: 'datetime', nullable: true })
  publishedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}