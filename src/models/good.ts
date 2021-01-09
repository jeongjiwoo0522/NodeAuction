import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("good")
class Good {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 40 })
  name: string;

  @Column({ nullable: true })
  img: string;

  @Column({ default: 0 })
  price: number;
}

export { Good }