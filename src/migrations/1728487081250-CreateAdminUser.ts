import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '~/entities/user.entity';
import { createHash } from '~/shared/utils/create-hash';

export class CreateAdminUser1728487081250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: process.env.APP_USERNAME,
      })
      .getOne();

    if (!user) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            username: process.env.APP_USERNAME,
            password: createHash(
              process.env.APP_PASSWORD,
              process.env.APP_PASSWORD_SECRET_KEY,
            ),
          },
        ])
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: process.env.APP_USERNAME,
      })
      .getOne();

    if (user) {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id: user.id })
        .execute();
    }
  }
}
