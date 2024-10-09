import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Wallet } from './wallet.entity';
import dataSource from '~/configs/data-source';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  username: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;
}

export const userRepository = {} as any;
