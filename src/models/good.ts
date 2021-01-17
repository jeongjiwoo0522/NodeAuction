import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { Auction } from "./auction";
import { PrimaryKeyId } from "./default";
import { User } from "./user";

@Entity("good")
class Good extends PrimaryKeyId{
  @Column({ type: "varchar", length: 40 })
  name: string;

  @Column({ nullable: true })
  img: string;

  @Column({ default: 0 })
  price: number;

  @OneToMany(type => Auction, auction => auction.good)
  auctions: Auction[];

  @ManyToOne(type => User, user => user.auctioned_good)
  owner: User;

  @ManyToOne(type => User, user => user.solded_good)
  sold: User;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;
}

export { Good }