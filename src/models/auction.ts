import { Column, Entity } from "typeorm";
import { PrimaryKeyId } from "./default";

@Entity("auction")
class Auction extends PrimaryKeyId {
  @Column({ default: 0 })
  bid: number;

  @Column({ nullable: true })
  msg: string;
}

export { Auction }