import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@/abstracts/abstract.entity';
import config from '@/config/required';

import Post from '@/providers/postgres/entities/post.entity';
import Reaction from '@/providers/postgres/entities/reaction.entity';
import User from '@/providers/postgres/entities/user.entity';

@Entity('comments', { database: config.APP_DB_NAME })
export default class Comment extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	content: string;

	@Column({ default: 0, type: 'numeric' })
	depth: number;

	@Column({ type: 'uuid', nullable: false })
	userId: string;

	@Column({ type: 'uuid', nullable: false })
	postId: string;

	@ManyToOne(() => User, (user) => user.comments)
	user: User;

	@ManyToOne(() => Post, (post) => post.comments)
	post: Post;

	@ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
	parentComment: Comment;

	@OneToMany(() => Comment, (comment) => comment.parentComment)
	replies: Comment[];

	@OneToMany(() => Reaction, (reaction) => reaction.comment)
	reactions: Reaction[];
}
