import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import Post from "../entity/post.entity";
import { DeepPartial } from "typeorm";
import User from "../entity/user.entity";

class PostService {
  async getAll() {
    return await myDataSource.getRepository(Post).find();
  }

  async getOne(id: number) {
    return await myDataSource.getRepository(Post).findOneBy({
      id: id,
    });
  }

  async create(payload: Post, userLogin: string) {
    const user = await myDataSource.getRepository(User).findOneBy({
      login: userLogin,
    });
    const post = myDataSource.getRepository(Post).create(payload);
    post.user = user;
    await myDataSource.getRepository(Post).save(post);
    return { success: true };
  }

  async change(id: FindOptionsWhere<Post>, payload: DeepPartial<Post>) {
    const post = await myDataSource.getRepository(Post).findOneBy(id);
    if (!post) {
      throw new Error("Пост не найден");
    }
    if (post.id === id.id) {
      myDataSource.getRepository(Post).merge(post, payload);
      return await myDataSource.getRepository(Post).save(post);
    } else {
      throw new Error("нельзя менять id");
    }
  }

  async delete(id: FindOptionsWhere<Post>) {
    const post = await myDataSource.getRepository(Post).findOneBy(id);
    if (!post) {
      throw new Error("Пост не найден");
    }
    return await myDataSource.getRepository(Post).delete(id);
  }
}

export default PostService;
