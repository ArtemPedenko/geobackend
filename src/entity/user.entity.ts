import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Image from "./images.entity";
import Doc from "./doc.entity";
import Post from "./post.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];

  @OneToMany(() => Doc, (doc) => doc.user)
  docs: Doc[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Doc[];
}

export default User;
