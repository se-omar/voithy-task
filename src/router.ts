import { Router } from 'express'
import patientRoutes from './api/patients/patients.routes'

const router = Router()
router.use('/api/Patient', patientRoutes)

export default router
