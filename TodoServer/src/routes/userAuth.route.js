import express from "express"
import { getUser, login, logout, signup } from "../controlller/userAuth.controller.js"
import { isAuthenticatedUser } from "../middleware/userAuth.middleware.js"

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.get('/user',isAuthenticatedUser ,  getUser)
router.post('/logout', isAuthenticatedUser,  logout)

export default router