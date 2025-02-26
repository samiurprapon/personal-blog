import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeDatabase1738533290125 implements MigrationInterface {
	name = 'InitializeDatabase1738533290125';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "emojis" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unicode" character varying NOT NULL, "shortcode" character varying, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_d0441182ac78cc27978dd5f4536" UNIQUE ("name"), CONSTRAINT "UQ_a09093b09d3590a955f263c4c10" UNIQUE ("unicode"), CONSTRAINT "UQ_2cca90ff12c7a1e8a34d02458dc" UNIQUE ("shortcode"), CONSTRAINT "CHK_a95179cbb41ddbe820a0bc34fc" CHECK ("unicode" <> ''), CONSTRAINT "CHK_88904f4e65a3927c287bd57d1c" CHECK ("name" <> ''), CONSTRAINT "PK_9adb96a675f555c6169bad7ba62" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "reactions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "emojiId" uuid, "postId" uuid, "commentId" uuid, CONSTRAINT "PK_0b213d460d0c473bc2fb6ee27f3" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "tags" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "CHK_4afd65fa5405e91f7d7ad52771" CHECK ("name" <> ''), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "posts" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "language" character varying NOT NULL DEFAULT 'english', "content" text NOT NULL, "status" character varying NOT NULL DEFAULT 'draft', "allowsReactions" boolean NOT NULL DEFAULT false, "isFeatured" boolean NOT NULL DEFAULT false, "audience" character varying NOT NULL DEFAULT 'public', "publishedAt" TIMESTAMP WITH TIME ZONE, "authorId" uuid NOT NULL, CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "CHK_3521f354f5f423c95415d6493e" CHECK (content <> ''), CONSTRAINT "CHK_ec737f0b3f8798d97bb85773cf" CHECK ("status" = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text, 'deleted'::text])), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "comments" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "depth" numeric NOT NULL DEFAULT '0', "userId" uuid NOT NULL, "postId" uuid NOT NULL, "parentCommentId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "users" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "githubId" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "avatarUrl" character varying, "bio" text, "role" character varying NOT NULL DEFAULT 'subscriber', CONSTRAINT "UQ_42148de213279d66bf94b363bf2" UNIQUE ("githubId"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE IF NOT EXISTS "postTags" ("postId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_cedaab85506d1d7f6032f403a02" PRIMARY KEY ("postId", "tagId"))`,
		);

		await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_e1769af5281dc8f20abb4c5280" ON "postTags" ("postId") `);
		await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_de83935864979b3a2b9330d71f" ON "postTags" ("tagId") `);

		await queryRunner.query(
			`ALTER TABLE "reactions" ADD CONSTRAINT "FK_f3e1d278edeb2c19a2ddad83f8e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "reactions" ADD CONSTRAINT "FK_44214f268d703742f6846d81a70" FOREIGN KEY ("emojiId") REFERENCES "emojis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "reactions" ADD CONSTRAINT "FK_d9628397382a90981e26a915bc9" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "reactions" ADD CONSTRAINT "FK_e71b81457fc37b486d72afb112f" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "comments" ADD CONSTRAINT "FK_4875672591221a61ace66f2d4f9" FOREIGN KEY ("parentCommentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "postTags" ADD CONSTRAINT "FK_e1769af5281dc8f20abb4c52809" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "postTags" ADD CONSTRAINT "FK_de83935864979b3a2b9330d71f5" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "postTags" DROP CONSTRAINT IF EXISTS "FK_de83935864979b3a2b9330d71f5"`);
		await queryRunner.query(`ALTER TABLE "postTags" DROP CONSTRAINT IF EXISTS "FK_e1769af5281dc8f20abb4c52809"`);
		await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT IF EXISTS "FK_4875672591221a61ace66f2d4f9"`);
		await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT IF EXISTS "FK_e44ddaaa6d058cb4092f83ad61f"`);
		await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT IF EXISTS "FK_7e8d7c49f218ebb14314fdb3749"`);
		await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "FK_c5a322ad12a7bf95460c958e80e"`);
		await queryRunner.query(`ALTER TABLE "reactions" DROP CONSTRAINT IF EXISTS "FK_e71b81457fc37b486d72afb112f"`);
		await queryRunner.query(`ALTER TABLE "reactions" DROP CONSTRAINT IF EXISTS "FK_d9628397382a90981e26a915bc9"`);
		await queryRunner.query(`ALTER TABLE "reactions" DROP CONSTRAINT IF EXISTS "FK_44214f268d703742f6846d81a70"`);
		await queryRunner.query(`ALTER TABLE "reactions" DROP CONSTRAINT IF EXISTS "FK_f3e1d278edeb2c19a2ddad83f8e"`);

		await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_de83935864979b3a2b9330d71f"`);
		await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_e1769af5281dc8f20abb4c5280"`);

		await queryRunner.query(`DROP TABLE IF EXISTS "postTags"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "comments"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "posts"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "tags"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "reactions"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "emojis"`);
	}
}
