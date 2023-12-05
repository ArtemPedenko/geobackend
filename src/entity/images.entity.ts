import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Image {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
}
export default Image;
