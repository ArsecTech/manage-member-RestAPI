const express = require('express');
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.usersList) //!Route: /api/v1/users
router.post('/', usersController.addUser) 
router.get('/:id', usersController.getUser) 
router.delete('/:id', usersController.removeUser)
module.exports = router