const express = require('express')
const router = express.Router()
const controller = require('../controllers/sessionsController')
const auth = require('../middlewares/auth')

router.post('/new', controller.newSession) 

module.exports = router
