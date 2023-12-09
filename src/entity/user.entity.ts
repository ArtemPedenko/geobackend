import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Image from "./images.entity";

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

  @OneToMany(() => Image, (photo) => photo.user)
  images: Image[];
}

export default User;
