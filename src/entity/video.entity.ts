import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./user.entity";

@Entity()
class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    imgName: string;

    @Column()
    videoUrl: string;

    @Column()
    category: string;

    @ManyToOne(() => User, (user) => user.videos)
    user: User;
}

export default Video;
