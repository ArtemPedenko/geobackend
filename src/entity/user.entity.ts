import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Image from "./images.entity";
import Doc from "./doc.entity";
import Post from "./post.entity";
import Video from "./video.entity";

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
  posts: Post[];

  @OneToMany(() => Post, (video) => video.user)
  videos: Video[];

}

export default User;
