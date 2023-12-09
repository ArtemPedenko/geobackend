import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import Post from "../entity/post.entity";
import { DeepPartial } from "typeorm";

class PostService {
  async getAll() {
    return await myDataSource.getRepository(Post).find();
  }

  async getOne(id: number) {
    return await myDataSource.getRepository(Post).findOneBy({
      id: id,
    });
  }

  async create(payload: Post): Promise<Post> {
    const post = myDataSource.getRepository(Post).create(payload);
    return await myDataSource.getRepository(Post).save(post);
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
