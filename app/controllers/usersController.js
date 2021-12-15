const UserModel = require('../models/userModel')
const usersList = async (req, res, next) => {
  let projection = {}
  if(req.query.hasOwnProperty('fields')) {
    projection = req.query.fields.split(',').reduce((total, current ) =>{
      return {[current]:1, ...total }
    },{}) 
    
  } 
  const users = await UserModel.find({}, projection)
  res.send({
    success: true,
    message:'لیست کاربران با موفقیت تولید شد',
    data:{
      users
    }
  })
}

const addUser = async (req, res, next) => {
  try {
    const {first_name,last_name,mobile,email} = req.body
    if(first_name == undefined || last_name == undefined || mobile == undefined || email == undefined){
      return res.status(422).send({
        error: true,
        message:'اطلاعات ارسالی برای ایجاد کاربر معتبر نمی باشد'
      })
    }
    const newUser = new UserModel({
      first_name,
      last_name,
      mobile,
      email
    })
    await newUser.save()
    res.status(201).send({
      success: true,
      message:'کاربر جدید با موفقیت ایجاد شد  ',
      newUser
    })

  }catch(err) {
    next(err)
  }

}
const getUser = async (req, res, next) => {


  try{
     const {id} = req.params //? req.params req.query req.body req.headers
     if(!id){
        return res.status(404).send({error: true, message:'کاربری با این مشخصات یافت نشد'})
     }
     const user = await UserModel.findOne({_id:id})
     if(!user){
       return res.status(404).send({error:true, message:'کاربری با این مشخصات یافت نشد'})
     }
     return res.send({
       success: true,
       data:{
         user
       }
     })
    }catch(err) {
    next(err)
  }

}


module.exports = {
  usersList,
  addUser,
  getUser
}
