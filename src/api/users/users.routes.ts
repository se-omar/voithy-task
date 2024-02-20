import { Router } from 'express'
import { createPatient } from './users.controller'

const userRoutes = Router()

userRoutes.post('/', createPatient)

export default userRoutes
