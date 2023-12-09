import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import myDataSource from "../app-data-source";
import Image from "../entity/images.entity";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";
import { DeepPartial } from "typeorm/common/DeepPartial";

class ImageService {
  async getAll() {
    return await myDataSource.getRepository(Image).find();
  }

  async upload(file: { mv: (arg0: string) => void }) {
    const fileName = uuidv4() + ".png";
    const filePath = path.resolve("public/images", fileName);
    file.mv(filePath);
    const imageObject: DeepPartial<Image> = {
      name: fileName,
    };
    const image = myDataSource.getRepository(Image).create(imageObject);
    return await myDataSource.getRepository(Image).save(image);
  }

  async delete(id: FindOptionsWhere<Image>) {
    const image = await myDataSource.getRepository(Image).findOneBy(id);
    if (!image) {
      throw new Error("Картинка не найдена");
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
