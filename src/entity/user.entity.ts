import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	login: string;

	@Column()
	password: string;

	@Column()
	refreshToken: string;
}
export default User;
