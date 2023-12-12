import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import Image from "../entity/images.entity";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";
import User from "../entity/user.entity";
import ApiError from "../exceptions/apiError";

class ImageService {
  async getAll() {
    return await myDataSource.getRepository(Image).find();
  }

  async upload(file: { mv: (arg0: string) => void }, userLogin: string) {
    const fileName = uuidv4() + ".png";
    const filePath = path.resolve("public/images", fileName);
    file.mv(filePath);
    const user = await myDataSource.getRepository(User).findOneBy({
      login: userLogin,
    });
    const image = myDataSource.getRepository(Image).create({ name: fileName });
    image.user = user;
    await myDataSource.getRepository(Image).save(image);
    return { name: image.name };
  }

  async delete(id: FindOptionsWhere<Image>) {
    const image = await myDataSource.getRepository(Image).findOneBy(id);
    if (!image) {
      throw ApiError.BadRequest(`No document with id = ${id}`);
    }
    const fileName = image.name;
    const filePath = path.resolve("public/images", fileName);
    fs.unlink(filePath, (error) => {
      if (error) {
        return error;
      }
    });
    return await myDataSource.getRepository(Image).delete(id);
  }
}

export default ImageService;
