const usersList = (req, res, next) => {
  res.send({
    success: true,
    message:'لیست کاربران با موفقیت تولید شد'
  })
}
module.exports = {
  usersList
}
