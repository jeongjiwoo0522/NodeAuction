import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 40, unique: true })
  email: string;

  @Column({ type: "varchar", length: 15})
  nick: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  password: string;

  @Column({ type: "integer", default: 0 })
  money: number;
}

export { User }