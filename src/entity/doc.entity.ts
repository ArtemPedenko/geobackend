import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./user.entity";

@Entity()
class Doc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.docs)
  user: User;
}

export default Doc;
