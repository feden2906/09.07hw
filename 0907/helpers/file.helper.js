const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const uuid = require('uuid').v1;

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
  fileDirBuilder: async (itemType, itemId, fileName, fileType) => {
    const filePathWithoutStatic = path.join(itemType, itemId.toString(), fileType);
    const fileDirectory = path.join(process.cwd(), 'static', filePathWithoutStatic);

    const fileExtension = fileName.split('.').pop();
    const uniqueFileName = `${uuid()}.${fileExtension}`;

    const finalFilePath = path.join(fileDirectory, uniqueFileName);
    const filePath = path.join(filePathWithoutStatic, uniqueFileName);

    await mkdirPromise(fileDirectory, { recursive: true });

    return {
      finalFilePath,
      filePath
    };
  }
};
