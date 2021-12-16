const TokenService = require('../services/TokenService')
module.exports = (req, res, next) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send({
      status: 'error',
      code: 401,
      message: 'you are not authorized!'
    }) 
  } 
  const [,tokenvValue] = req.headers.authorization.split(' ') 
  const token = TokenService.verify(tokenvValue)
   if(!token) {
    return res.status(401).send({
        status: 'error',
        code: 401,
        message: 'you token is not valid!'
      }) 
   }
   next()
}
