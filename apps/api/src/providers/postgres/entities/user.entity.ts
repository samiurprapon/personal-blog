import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@/abstracts/abstract.entity';
import { config } from '@/config/required';

import Comment from '@/providers/postgres/entities/comment.entity';
import Post from '@/providers/postgres/entities/post.entity';
import Reaction from '@/providers/postgres/entities/reaction.entity';

import role, { ROLES } from '@/types/role';

@Entity('users', { database: config.APP_DB_NAME })
export default class User extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', unique: true })
	githubId: string;

	@Column({ type: 'varchar', unique: true })
	username: string;

	@Column({ type: 'varchar', unique: true })
	email: string;

	@Column({ type: 'varchar', nullable: true })
	avatarUrl?: string;

	@Column({ type: 'text', nullable: true })
	bio: string;

	@Column({ type: 'varchar', default: ROLES[0] /* default user */ })
	role: role;

	@OneToMany(() => Post, (post) => post.author, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	posts: Post[];

	@OneToMany(() => Comment, (comment) => comment.user, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	comments: Comment[];

	@OneToMany(() => Reaction, (reaction) => reaction.user, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	reactions: Reaction[];
}
