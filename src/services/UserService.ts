import * as bcrypt from "bcrypt";
import TokenService from "./TokenService";
import myDataSource from "../app-data-source";
import User from "../entity/user.entity";

const tokenService = new TokenService();

class UserService {
	async login(login: string, password: string) {
		//получаем данные юзера по логину
		const user = await myDataSource.getRepository(User).findOneBy({
			login: login,
		});
		if (!user) {
			throw new Error("no user with same login");
		}
		const isPasswordEqual = await bcrypt.compare(password, user.password);
		if (!isPasswordEqual) {
			throw new Error("wrong password");
		}
		//генерируем новые токены
		const tokens = tokenService.generateToken({
			login: user.login,
			role: user.login,
		});
		//записываем в бд новый рефреш токен
		console.log(tokens);
		myDataSource
			.getRepository(User)
			.merge(user, { refreshToken: tokens.refreshToken });
		await myDataSource.getRepository(User).save(user);
		return { ...tokens, login: user.login, role: user.role };
	}
}

export default UserService;
