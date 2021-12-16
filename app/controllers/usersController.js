const UserModel = require('../models/userModel')

const usersList = async (req, res, next) => {
  let projection = {}
  if(req.query.hasOwnProperty('fields')) {
    projection = req.query.fields.split(',').reduce((total, current ) =>{
      return {[current]:1, ...total }
    },{}) 
    
  } 

  const perPage = 1
  const page = req.query.page || 1
  const offset = (page - 1) * perPage
  const usersCount = await UserModel.count()
  const totalPages = Math.ceil(usersCount / perPage)
  const users = await UserModel.find({}, projection).limit(perPage).skip(offset)
  
  res.send({
    success: true,
    message:'لیست کاربران با موفقیت تولید شد',
    data:{
      users
    },
    meta:{
      page:parseInt(page),
      pages:totalPages,
      next:hasNextPage(page,totalPages) ? `${process.env.APP_URL}/api/v1/users?page=${parseInt(page) + 1} ` : null,
      prev:hasPrevPage(page,totalPages) ? `${process.env.APP_URL}/api/v1/users?page=${page - 1} ` : null,

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

const removeUser = async (req,res,next) => {
  try{
    const {id} = req.params //? req.params req.query req.body req.headers
    if(!id){
       return res.status(404).send({error: true, message:'کاربری با این مشخصات یافت نشد'})
    }

    await UserModel.deleteOne({_id:id})
    res.send({success: true, message:'کاربر با موفقیت حذف شد'})

  }catch(err) {
    next(err)
  }
}

const updateUser = async (req,res,next) => {
  try{
    const {id} = req.params //? req.params req.query req.body req.headers
    if(!id){
       return res.status(404).send({error: true, message:'کاربری با این مشخصات یافت نشد'})
    }

   const {n,nModified} = await UserModel.updateOne({_id:id},{...req.body})
    
   
   if(n===0 || nModified ===0){
     throw new Error('عملیات به روز رسانی با خطا مواجه شد!')
   }
   
   res.send({success: true, message:'کاربر با موفقیت به روز رسانی شد'})

  }catch(err) {
    next(err)
  }
}

module.exports = {
  usersList,
  addUser,
  getUser,
  removeUser,
  updateUser
}

const hasNextPage = (page,totalPages) => {
  return page < totalPages;
}

const hasPrevPage = (page,totalPages) => {
  return page > 1;
}