import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./user.entity";

@Entity()
class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alt: string;

  @ManyToOne(() => User, (user) => user.images)
  user: User;
}

export default Image;
