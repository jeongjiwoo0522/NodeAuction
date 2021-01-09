import { Column, Entity, OneToMany } from "typeorm";
import { Auction } from "./auction";
import { PrimaryKeyId } from "./default";
import { Good } from "./good";

@Entity("user")
class User extends PrimaryKeyId {
  @Column({ type: "varchar", length: 40, unique: true })
  email: string;

  @Column({ type: "varchar", length: 15})
  nick: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  password: string;

  @Column({ type: "integer", default: 0 })
  money: number;

  @OneToMany(type => Auction, auction => auction.user)
  auctions: Auction[];

  @OneToMany(type => Good, good => good.owner)
  auctioned_good: Good[];

  @OneToMany(type => Good, good => good.sold)
  solded_good: Good[];
}

export { User }