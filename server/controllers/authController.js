const authModels = require('../models/authModels')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

const registerValidation = [
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters')
]

const register_post = async (req, res) =>{
      const errors = validationResult(req)
      
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



module.exports = {register_post, registerValidation}