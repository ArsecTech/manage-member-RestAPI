const UserModel = require('../models/userModel')
const TokenService = require('../services/tokenService')

exports.newSession = async (req, res, next) => {
    try{
        //todo: password
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).send({
                status: 'error',
                code: 404,    
                message:'آدرس ایمیل یا کلمه ورود اشتباه است!'
            })
        }
        const token = await TokenService.sign({id:user._id})
        res.send({
            status: 'success',
            code: 200,
            token
        })
    }catch(err){
        next(err)
    }
}