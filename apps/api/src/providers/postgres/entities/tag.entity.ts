import { Check, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@/abstracts/abstract.entity';
import { config } from '@/config/required';

import Post from '@/providers/postgres/entities/post.entity';

@Entity('tags', { database: config.APP_DB_NAME })
@Check(`"name" <> ''`)
export default class Tag extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, type: 'varchar', nullable: false })
	name: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@ManyToMany(() => Post, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	posts: Post[];
}
