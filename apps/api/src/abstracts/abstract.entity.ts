import { BeforeSoftRemove, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity {
	@CreateDateColumn({ type: 'timestamptz' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deletedAt?: Date;

	@BeforeSoftRemove()
	public async softRemove(): Promise<void> {
		this.deletedAt = new Date();
	}
}
