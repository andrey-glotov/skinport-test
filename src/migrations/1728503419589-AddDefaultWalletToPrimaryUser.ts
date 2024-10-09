import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '~/entities/user.entity';
import { Wallet } from '~/entities/wallet.entity';
import { Currency } from '~/shared/types/currency';

export class AddDefaultWalletToPrimaryUser1728503419589
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: process.env.APP_USERNAME,
      })
      .getOne();

    const wallet = new Wallet({
      currency: Currency.EUR,
      balance: 999999999,
    });

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Wallet)
      .values([wallet])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .relation(User, 'wallet')
      .of(user)
      .add(wallet);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: process.env.APP_USERNAME,
      })
      .getOne();

    const wallet = await queryRunner.manager
      .getRepository(Wallet)
      .createQueryBuilder('wallet')
      .where('wallet.userId = :id', {
        id: user.id,
      })
      .getOne();

    await queryRunner.manager
      .createQueryBuilder()
      .relation(User, 'wallet')
      .of(user) // you can use just post id as well
      .remove(wallet);

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Wallet)
      .where('id = :id', { id: wallet.id })
      .execute();
  }
}
