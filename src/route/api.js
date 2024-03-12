const express = require('express')
const UserController = require('../controller/UserController')
const ToDoListController = require('../controller/ToDoListController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

const router = express.Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)

router.get('/verifyEmail/:email', UserController.verifyEmail)
router.get('/verifyOTP/:email/:otp', UserController.verifyOTP)
router.get('/passwordReset/:email/:otp/:password', UserController.passwordReset)

// After Login
router.get('/profileDetails', AuthMiddleware, UserController.profileDetails)
router.post('/profileUpdate', AuthMiddleware, UserController.profileUpdate)

// Task Create, Task Update, Task Delete, Task Read
router.post('/todo/create', AuthMiddleware, ToDoListController.create)
router.post('/todo/update/:id', AuthMiddleware, ToDoListController.update)
router.get('/todo/read', AuthMiddleware, ToDoListController.read)
router.get('/todo/delete/:id', AuthMiddleware, ToDoListController.delete)

module.exports = router
