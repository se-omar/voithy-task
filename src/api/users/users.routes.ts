import { Router } from 'express'
import { login, signup } from './users.controller'

const userRoutes = Router()

userRoutes.post('/login', login)
userRoutes.post('/signup', signup)

export default userRoutes
