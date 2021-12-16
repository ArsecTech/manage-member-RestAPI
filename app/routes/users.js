const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const auth = require('../middlewares/auth')


router.get('/', [auth], usersController.usersList) //!Route: /api/v1/users
router.post('/', usersController.addUser) 
router.get('/:id', usersController.getUser) 
router.delete('/:id', usersController.removeUser)
router.patch('/:id', usersController.updateUser) 
module.exports = router
