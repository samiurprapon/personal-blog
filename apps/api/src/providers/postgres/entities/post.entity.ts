import { Check, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@/abstracts/abstract.entity';
import { config } from '@/config/required';

import User from '@/providers/postgres/entities/user.entity';
import Comment from '@/providers/postgres/entities/comment.entity';
import Reaction from '@/providers/postgres/entities/reaction.entity';
import Tag from '@/providers/postgres/entities/tag.entity';

import audience, { AUDIENCES } from '@/types/audience';
import language, { LANGUAGES } from '@/types/language';
import postStatus, { POST_STATUSES } from '@/types/postStatus';

@Entity('posts', { database: config.APP_DB_NAME })
@Check(`"status" = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text, 'deleted'::text])`)
@Check(`content <> ''`)
export default class Post extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	public title: string;

	@Column({ type: 'varchar', unique: true })
	public slug: string;

	@Column({ default: LANGUAGES[0] /* default to english */, type: 'varchar' })
	public language: language;

	@Column({ type: 'text', nullable: false })
	public content: string;

	@Column({ default: POST_STATUSES[0] /* default to draft */, type: 'varchar' })
	public status: postStatus;

	@Column({ type: 'boolean', default: false })
	allowsReactions: boolean;

	@Column({ type: 'boolean', default: false })
	isFeatured: boolean;

	@Column({ default: AUDIENCES[0] /* default to public */, type: 'varchar' })
	audience: audience;

	@Column({ type: 'timestamptz', nullable: true })
	public publishedAt?: Date;

	@Column({ type: 'uuid', nullable: false })
	public authorId: string;

	constructor(props: Partial<Post>) {
		super();
		Object.assign(this, props);
	}

	// relations
	@ManyToOne(() => User, (user) => user.posts)
	author: User;

	@OneToMany(() => Comment, (comment) => comment.post, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	comments: Comment[];

	@OneToMany(() => Reaction, (reaction) => reaction.post, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	reactions: Reaction[];

	@ManyToMany(() => Tag)
	@JoinTable({
		name: 'postTags',
		joinColumn: { name: 'postId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
	})
	tags: Tag[];
}
