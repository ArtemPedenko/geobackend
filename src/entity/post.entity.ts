import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "json" })
	content: object;

	@Column()
	author: string;

	@Column()
	date: string;
}
export default Post;
