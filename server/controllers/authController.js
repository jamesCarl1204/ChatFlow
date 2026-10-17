const authModels = require('../models/authModels')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerValidation = [
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters')
]

function createToken(id) {
  return jwt.sign({id}, 'secret', {expiresIn: '3h'})
}

const register_post = async (req, res) =>{
      const errors = validationResult(req)
      
      console.log(errors)

      if(!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array()})
      }

      try{

      const {email, password} = req.body

      const isExist = await authModels.isEmailExist(email)

      if(isExist.length > 0) {
        return res.status(400).json({errors: [{path:'email', msg: 'wrong email or password'}] })
      }

      const id = await authModels.createAccount(email, password)

      if(id) {
        res.status(200).json({success:true, msg:'account creater'})
      }

      } catch(err) {
        console.log(err)
      }
}

const login_post = async (req,res) => {
    const {email,password} = req.body
    
    const account = await authModels.getEmail(email)
    console.log(password)
    console.log(account)
    const isMatch = await bcrypt.compare(password, account[0].password)

    if(!isMatch) {
        return res.status(400).json({success: false, msg: 'invalid email or password'})
    }

    const id = account[0].id

    const token = createToken(id)
    
    res.cookie('jwt', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 3000})
    res.json({success: true, user: id})
}

module.exports = {register_post, registerValidation, login_post}