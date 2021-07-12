const {
  fileConstants: {
    DOCUMENT_MAX_SIZE,
    IMAGE_MAX_SIZE,
    DOCUMENT_MIMETYPES,
    IMAGE_MIMETYPES
  },
  responseCodesEnum
} = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      const files = Object.values(req.files);

      const documents = [];
      const images = [];

      for (const file of files) {
        const { name, size, mimetype } = file;

        if (DOCUMENT_MIMETYPES.includes(mimetype)) {
          if (size > DOCUMENT_MAX_SIZE) {
            throw new ErrorHandler(
              responseCodesEnum.ERROR_WITH_MEDIA,
              errorMessages.MAX_SIZE_FOR_MEDIA.message(name, DOCUMENT_MAX_SIZE),
              errorMessages.MAX_SIZE_FOR_MEDIA.code
            );
          }

          documents.push(file);
        } else if (IMAGE_MIMETYPES.includes(mimetype)) {
          if (size > IMAGE_MAX_SIZE) {
            throw new ErrorHandler(
              responseCodesEnum.ERROR_WITH_MEDIA,
              errorMessages.MAX_SIZE_FOR_MEDIA.message(name, IMAGE_MAX_SIZE),
              errorMessages.MAX_SIZE_FOR_MEDIA.code
            );
          }

          images.push(file);
        } else {
          throw new ErrorHandler(
            responseCodesEnum.ERROR_WITH_MEDIA,
            errorMessages.WRONG_MIMETYPE.message(name),
            errorMessages.WRONG_MIMETYPE.code
          );
        }
      }

      req.documents = documents;
      req.images = images;

      next();
    } catch (e) {
      next(e);
    }
  }
};
