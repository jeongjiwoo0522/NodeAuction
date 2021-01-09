import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("auction")
class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  bid: number;

  @Column({ nullable: true })
  msg: string;
}

export { Auction }