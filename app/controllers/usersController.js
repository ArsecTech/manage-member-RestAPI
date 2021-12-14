const UserModel = require('../models/userModel')
const usersList = (req, res, next) => {
  const user = UserModel.find()
  res.send({
    success: true,
    message:'لیست کاربران با موفقیت تولید شد'
  })
}
const addUser = async (req, res, next) => {
  try {

    const newUser = new UserModel({
      first_name: 'سید عرشیا',
      last_name: 'غفاریان',
      mobile: '09228645257',
      email: 'arshia.ghaffarian003@gmail.com'
    })
    await newUser.save()
    res.send({
      success: true,
      message:'کاربر جدید با موفقیت ایجاد شد  ',
      newUserID:newUser._id
    })

  }catch(err) {
    next(err)
  }

}

module.exports = {
  usersList,
  addUser
}
