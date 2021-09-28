const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const {
    users_delete,
    users_delete_all,
    users_get,
    users_get_all,
    users_login,
    users_signup,
    users_update
} = require('../controller/user')

// total get user
router.get('/', users_get_all)

// detail get user
router.get('/:userId', checkAuth, users_get)

// signup
router.post('/signup', users_signup)

// login
router.post('/login', users_login)

// update user
router.patch('/:userId', checkAuth, users_update)

// total delete user
router.delete('/', users_delete_all)

// detail delete user
router.delete('/:userId', checkAuth, users_delete)

module.exports = router