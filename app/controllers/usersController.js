const usersList = (req, res, next) => {
  const user = UserModel.find()
  res.send({
    success: true,
    message:'لیست کاربران با موفقیت تولید شد'
  })
}
module.exports = {
  usersList
}
