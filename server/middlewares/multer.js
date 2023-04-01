const multer = require('multer')
const path = require('path')

const FILES_PATH = 'uploads/'

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, FILES_PATH)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${ext}`)
    }
})

const upload = multer({ storage: storage })

module.exports = {
    upload,
    FILES_PATH
}
