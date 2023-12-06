import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Pdf {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
}
export default Pdf;
