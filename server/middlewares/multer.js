const multer = require('multer')

const FILES_PATH = 'uploads/'

const upload = multer({ dest: FILES_PATH })

module.exports = upload
