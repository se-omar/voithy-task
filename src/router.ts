import { Router } from 'express'
import patientRoutes from './api/patients/patients.routes'
import userRoutes from './api/users/users.routes'
import { authenticateToken } from './config/jwt'

const router = Router()
router.use('/api/User', userRoutes)
router.use('/api/Patient', authenticateToken, patientRoutes)

export default router
