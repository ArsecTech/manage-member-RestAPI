/* eslint-disable no-unused-vars */
const userRouter = require('./users')
const sessioRouter = require('./sessions')
const auth = require('../middlewares/auth')
module.exports = (app) => {
  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/session', sessioRouter)
  
}
