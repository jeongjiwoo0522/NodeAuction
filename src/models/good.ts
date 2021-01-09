import { Column, Entity } from "typeorm";
import { PrimaryKeyId } from "./default";

@Entity("good")
class Good extends PrimaryKeyId{
  @Column({ type: "varchar", length: 40 })
  name: string;

  @Column({ nullable: true })
  img: string;

  @Column({ default: 0 })
  price: number;
}

export { Good }