const express = require('express')
const router = express.Router()

const {register_post, registerValidation} = require('../controllers/authController')



router.post('/register', registerValidation,register_post)

module.exports = router