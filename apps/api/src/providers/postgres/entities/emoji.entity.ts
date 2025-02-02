import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { config } from '@/config/required';
import { AbstractEntity } from '@/abstracts/abstract.entity';

import Reaction from '@/providers/postgres/entities/reaction.entity';

@Entity('emojis', { database: config.APP_DB_NAME })
@Check(`"name" <> ''`)
@Check(`"unicode" <> ''`)
export default class Emoji extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, type: 'varchar' })
	name: string;

	@Column({ type: 'varchar', unique: true })
	unicode: string;

	@Column({ type: 'varchar', unique: true, nullable: true })
	shortcode: string;

	@Column({ default: true, type: 'boolean' })
	isActive: boolean;

	@OneToMany(() => Reaction, (reaction) => reaction.emoji)
	reactions: Reaction[];
}
