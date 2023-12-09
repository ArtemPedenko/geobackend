import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { DeepPartial } from "typeorm/common/DeepPartial";
import myDataSource from "../app-data-source";
import Doc from "../entity/doc.entity";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";

class DocService {
  async getAll() {
    return await myDataSource.getRepository(Doc).find();
  }

  async upload(file: { mv: (arg0: string) => void; name: string }) {
    const nameArray = file.name.split(".");
    const extension = nameArray[nameArray.length - 1];
    const fileName = uuidv4() + "." + extension;
    const filePath = path.resolve("public/docs", fileName);
    file.mv(filePath);
    const pdfObject: DeepPartial<Doc> = {
      name: fileName,
    };
    const image = myDataSource.getRepository(Doc).create(pdfObject);
    return await myDataSource.getRepository(Doc).save(image);
  }

  async delete(id: FindOptionsWhere<Doc>) {
    const pdf = await myDataSource.getRepository(Doc).findOneBy(id);
    if (!pdf) {
      return "Документ не найден";
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
