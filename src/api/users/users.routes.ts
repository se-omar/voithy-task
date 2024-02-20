import { Router } from 'express'
import { login } from './users.controller'

const userRoutes = Router()

userRoutes.post('/login', login)
// userRoutes.post('/signup', createPatient)

export default userRoutes
