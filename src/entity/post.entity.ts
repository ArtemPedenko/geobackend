import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "json" })
	content: object;
}
export default Post;
