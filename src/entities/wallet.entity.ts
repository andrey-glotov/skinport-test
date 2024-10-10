import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { Currency } from '~/shared/types/currency';

@Entity()
export class Wallet {
  constructor(props?: { currency: Currency; balance?: number }) {
    if (props) {
      this.currency = props.currency;
      this.balance = props.balance;
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Currency, default: Currency.EUR })
  currency: Currency;

  @Column({ type: 'float' })
  balance: number;

  @ManyToOne(() => User, (user) => user.wallet)
  user: number;
}
