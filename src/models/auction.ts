import { Column, Entity, ManyToOne } from "typeorm";
import { PrimaryKeyId } from "./default";
import { Good } from "./good";
import { User } from "./user";

@Entity("auction")
class Auction extends PrimaryKeyId {
  @Column({ default: 0 })
  bid: number;

  @Column({ nullable: true })
  msg: string;

  @ManyToOne(type => User, user => user.auctions)
  user: User;

  @ManyToOne(type => Good, good => good.auctions)
  good: Good;
}

export { Auction }