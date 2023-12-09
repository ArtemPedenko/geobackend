import myDataSource from "../app-data-source";
import Post from "../entity/post.entity";
import { Request, Response } from "express";
import PostService from "../services/PostService";

const service = new PostService();

class PostController {
  async getAllPosts(req: Request, res: Response) {
    try {
      const result = await service.getAllPosts();
      return res.json(result);
    } catch (e) {
      res.json({ sucess: true, message: e.message });
    }
  }

  async getOnePost(req: Request, res: Response) {
    try {
      const results = await service.getOnePost(+req.params.id);
      return res.send(results);
    } catch (e) {
      res.json({ sucess: true, message: e.message });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const post = await myDataSource.getRepository(Post).create(req.body);
      const results = await myDataSource.getRepository(Post).save(post);
      return res.send({ sucess: true, message: results });
    } catch (e) {
      res.json({ sucess: true, message: e.message });
    }
  }

  async changePost(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const results = await service.changePost({ id: id }, req.body);
      res.json({ sucess: true, message: results });
    } catch (e) {
      res.json({ sucess: true, message: e.message });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      //find post with same id
      const id = +req.params.id;
      const result = await service.deletePost({ id: id });
      res.json(result);
    } catch (e) {
      res.json({ sucess: true, message: e.message });
    }
  }
}

export default PostController;
