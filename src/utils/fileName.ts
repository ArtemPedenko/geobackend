import myDataSource from "../app-data-source";

function transliterate(text: string) {
    const russianLetters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    const englishTranslit = [
        "a", "b", "v", "g", "d", "e", "yo", "zh", "z", "i", "y", "k", "l", "m",
        "n", "o", "p", "r", "s", "t", "u", "f", "kh", "ts", "ch", "sh", "shch",
        "", "y", "", "e", "yu", "ya"
    ];

    return text.toLowerCase().split('').map(char => {
        const index = russianLetters.indexOf(char);
        if (index !== -1) {
            return englishTranslit[index];
        }
        return char;
    }).join('');
}

async function newFileName(fileName: string, table: any) {
    const translitFileName = transliterate(fileName)
    console.log(translitFileName)
    const img = await myDataSource.getRepository(table).findOneBy({name: translitFileName});
    if (!img) {
        return translitFileName;
    } else {
        const fileNameArray = translitFileName.split('.');
        const fileExtension = fileNameArray[fileNameArray.length - 1];
        const newName = translitFileName.split(fileExtension)[0] + "1" + '.' + fileExtension;
        return await newFileName(newName, table);
    }
}

export {newFileName}