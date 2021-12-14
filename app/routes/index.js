const userRouter = require('./users')
module.exports = (app) => {
    app.use('/api/v1/users', userRouter)
}
