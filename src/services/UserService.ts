import * as bcrypt from "bcrypt";
import TokenService from "./TokenService";
import myDataSource from "../app-data-source";
import User from "../entity/user.entity";
import ApiError from "../exceptions/apiError";

const tokenService = new TokenService();

class UserService {
  async login(login: string, password: string) {
    const user = await myDataSource.getRepository(User).findOneBy({
      login: login,
    });
    if (!user) {
      console.log("No user");
      throw ApiError.BadRequest("No user with same login");
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.BadRequest("wrong password");
    }
    const tokens = tokenService.generateToken({
      login: user.login,
      role: user.login,
    });
    myDataSource
      .getRepository(User)
      .merge(user, { refreshToken: tokens.refreshToken });
    await myDataSource.getRepository(User).save(user);
    return { ...tokens, login: user.login, role: user.role };
  }
}

export default UserService;
