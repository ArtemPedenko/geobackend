import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./user.entity";

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  content: object;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.images)
  user: User;
}

export default Post;
