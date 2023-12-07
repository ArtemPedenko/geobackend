import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { DeepPartial } from "typeorm/common/DeepPartial";
import myDataSource from "../app-data-source";
import Doc from "../entity/doc.entity";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";

class PdfService {
	async getAllDocs() {
		const result = await myDataSource.getRepository(Doc).find();
		return result;
	}

	async uploadDoc(file: { mv: (arg0: string) => void; name: string }) {
		const nameArray = file.name.split(".");
		const extension = nameArray[nameArray.length - 1];
		const fileName = uuidv4() + "." + extension;
		const filePath = path.resolve("public/docs", fileName);
		file.mv(filePath);
		const pdfObject: DeepPartial<Doc> = {
			name: fileName,
		};
		const image = myDataSource.getRepository(Doc).create(pdfObject);
		const results = await myDataSource.getRepository(Doc).save(image);
		return results;
	}

	async deleteDoc(id: FindOptionsWhere<Doc>) {
		//find doc with same id
		const pdf = await myDataSource.getRepository(Doc).findOneBy(id);
		if (!pdf) {
			return { sucess: false, message: "Документ не найден" };
		}
		//delete doc
		const fileName = pdf.name;
		const filePath = path.resolve("public/docs", fileName);
		fs.unlink(filePath, (error) => {
			if (error) {
				return error;
			}
		});
		const results = await myDataSource.getRepository(Doc).delete(id);
		return results;
	}
}

export default PdfService;
