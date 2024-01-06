import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import User from "../entity/user.entity";
import ApiError from "../exceptions/apiError";
import Video from "../entity/video.entity";
import {DeepPartial} from "typeorm";

class VideoService {
    async getAll() {
        return await myDataSource.getRepository(Video).find();
    }

    async getOne(id: number) {
        const video = await myDataSource.getRepository(Video).findOneBy({
            id: id,
        });
        if (!video) {
            throw ApiError.BadRequest(`No post with id = ${id}`);
        }
        return;
    }

    async create(payload: Video, userLogin: string) {
        const user = await myDataSource.getRepository(User).findOneBy({
            login: userLogin,
        });
        if (!user) {
            throw ApiError.BadRequest(`No user with login = ${userLogin}`);
        }
        const video = myDataSource.getRepository(Video).create(payload);
        video.user = user;
        await myDataSource.getRepository(Video).save(video);
        return { success: true };
    }

    async change(id: FindOptionsWhere<Video>, payload: DeepPartial<Video>) {
        const video = await myDataSource.getRepository(Video).findOneBy(id);
        if (!video) {
            throw ApiError.BadRequest(`No post with id = ${id.id}`);
        }
        if (video.id === id.id) {
            myDataSource.getRepository(Video).merge(video, payload);
            return await myDataSource.getRepository(Video).save(video);
        } else {
            throw ApiError.BadRequest(`You cant change id`);
        }
    }

    async delete(id: FindOptionsWhere<Video>) {
        const post = await myDataSource.getRepository(Video).findOneBy(id);
        if (!post) {
            throw ApiError.BadRequest(`No post with id = ${id.id}`);
        }
        return await myDataSource.getRepository(Video).delete(id);
    }
}

export default VideoService;
