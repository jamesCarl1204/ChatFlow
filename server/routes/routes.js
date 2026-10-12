const express = require('express')
const router = express.Router()

const {register_post} = require('../controllers/authController')



router.post('/register', register_post)

module.exports = router