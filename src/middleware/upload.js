const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimeType === 'image/png' ||
        file.mimeType === 'image/jpg' ||
        file.mimeType === 'image/jpeg'
    ) {
        cb(null, true);
    }
    else {
        cb(null, false)
    }
}

module.exports.fileStorage = fileStorage;
module.exports.fileFilter = fileFilter;