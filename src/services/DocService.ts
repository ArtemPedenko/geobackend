import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { DeepPartial } from "typeorm/common/DeepPartial";
import myDataSource from "../app-data-source";
import Doc from "../entity/doc.entity";
import * as path from "path";
import * as fs from "fs";
import User from "../entity/user.entity";
import ApiError from "../exceptions/apiError";
import {newFileName} from "../utils/fileName";

class DocService {
  async getAll() {
    return await myDataSource.getRepository(Doc).find();
  }

  async upload(
    file: { mv: (arg0: string) => void; name: string },
    userLogin: string,
  ) {

    const fileName = await newFileName(file.name, Doc);
    const filePath = path.resolve("public/docs", fileName);
    file.mv(filePath);
    const docObject: DeepPartial<Doc> = {
      name: fileName,
    };
    const user = await myDataSource.getRepository(User).findOneBy({
      login: userLogin,
    });
    const doc = myDataSource.getRepository(Doc).create(docObject);
    doc.user = user;
    await myDataSource.getRepository(Doc).save(doc);
    return { name: doc.name };
  }

  async delete(id: FindOptionsWhere<Doc>) {
    const pdf = await myDataSource.getRepository(Doc).findOneBy(id);
    if (!pdf) {
      throw ApiError.BadRequest(`No document with id = ${id.id}`);
    }
    const fileName = pdf.name;
    const filePath = path.resolve("public/docs", fileName);
    fs.unlink(filePath, (error) => {
      if (error) {
        return error;
      }
    });
    return await myDataSource.getRepository(Doc).delete(id);
  }
}

export default DocService;
