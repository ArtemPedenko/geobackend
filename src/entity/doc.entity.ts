import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Doc {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
}
export default Doc;
