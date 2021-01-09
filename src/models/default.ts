import { PrimaryGeneratedColumn } from "typeorm";

abstract class PrimaryKeyId {
  @PrimaryGeneratedColumn()
  id: number;
}

export { PrimaryKeyId }