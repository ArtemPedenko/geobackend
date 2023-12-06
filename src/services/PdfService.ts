import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { DeepPartial } from "typeorm/common/DeepPartial";
import myDataSource from "../app-data-source";
import Pdf from "../entity/pdf.entity";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";

class PdfService {
	async getAllPdfs() {
		const result = await myDataSource.getRepository(Pdf).find();
		return result;
	}

	async uploadPdf(file: { mv: (arg0: string) => void }) {
		const fileName = uuidv4() + ".pdf";
		const filePath = path.resolve("public/pdfs", fileName);
		file.mv(filePath);
		const pdfObject: DeepPartial<Pdf> = {
			name: fileName,
		};
		const image = myDataSource.getRepository(Pdf).create(pdfObject);
		const results = await myDataSource.getRepository(Pdf).save(image);
		return results;
	}

	async deletePdf(id: FindOptionsWhere<Pdf>) {
		//find post with same id
		const pdf = await myDataSource.getRepository(Pdf).findOneBy(id);
		if (!pdf) {
			return { sucess: false, message: "Картинка не найдена" };
		}
		//delete post
		const fileName = pdf.name;
		const filePath = path.resolve("public/images", fileName);
		fs.unlink(filePath, (error) => {
			if (error) {
				return error;
			}
		});
		const results = await myDataSource.getRepository(Pdf).delete(id);
		return results;
	}
}

export default PdfService;
