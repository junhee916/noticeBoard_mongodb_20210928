const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check_auth')
const {
    boards_delete,
    boards_delete_all,
    boards_get,
    boards_get_all,
    boards_register,
    boards_update
} = require('../controller/board')

const storage = multer.diskStorage({

    destination : function(req, file, cb){
        cb(null, './uploads')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

const upload = multer({
    storage : storage,
    limit : {
        filesize : 1024*1024*5
    },
    fileFilter : fileFilter
})

// total get board
router.get('/', boards_get_all)

// detail get 
router.get('/:boardId', checkAuth, boards_get)

// register board
router.post('/', upload.single('boardImage'), boards_register)

// update board
router.patch('/:boardId', checkAuth, boards_update)

// total delete board
router.delete('/', boards_delete_all)

// detail delete board 
router.delete('/:boardId', checkAuth, boards_delete)

module.exports = router