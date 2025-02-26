import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@/abstracts/abstract.entity';
import { config } from '@/config/required';

import Comment from '@/providers/postgres/entities/comment.entity';
import Emoji from '@/providers/postgres/entities/emoji.entity';
import Post from '@/providers/postgres/entities/post.entity';
import User from '@/providers/postgres/entities/user.entity';

@Entity('reactions', { database: config.APP_DB_NAME })
export default class Reaction extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid', nullable: false })
	userId: string;

	@Column({ type: 'uuid', nullable: true })
	emojiId: string;

	@Column({ type: 'uuid', nullable: true })
	postId: string;

	@Column({ type: 'uuid', nullable: true })
	commentId: string;

	@ManyToOne(() => User, (user) => user.reactions)
	user: User;

	@ManyToOne(() => Emoji, (emoji) => emoji.reactions)
	emoji: Emoji;

	@ManyToOne(() => Post, (post) => post.reactions, { nullable: true })
	post: Post;

	@ManyToOne(() => Comment, (comment) => comment.reactions, { nullable: true })
	comment: Comment;
}
