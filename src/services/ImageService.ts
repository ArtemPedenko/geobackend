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
    console.log('image service get all');
    return await myDataSource.getRepository(Image).find();
  }

  async upload(file: { mv: (arg0: string) => void, name: string }, alt: string, userLogin: string) {
    async function newFileName(imgName: string) {
      const img = await myDataSource.getRepository(Image).findOneBy({name: imgName});
      if (!img) {
        return imgName;
      } else {
        const fileNameArray = imgName.split('.');
        const fileExtension = fileNameArray[fileNameArray.length - 1];
        const newName = imgName.split(fileExtension)[0] + "1" + '.' + fileExtension;
        return await newFileName(newName);
      }
    }

    const fileName = await newFileName(file.name);
    const filePath = path.resolve("public/images", fileName);
    file.mv(filePath);
    const user = await myDataSource.getRepository(User).findOneBy({
      login: userLogin,
    });
    const image = myDataSource.getRepository(Image).create({ name: fileName, alt: alt });
    image.user = user;
    await myDataSource.getRepository(Image).save(image);
    return { name: image.name };
  }

  async delete(id: FindOptionsWhere<Image>) {
    const image = await myDataSource.getRepository(Image).findOneBy(id);
    if (!image) {
      throw ApiError.BadRequest(`No document with id = ${id.id}`);
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
