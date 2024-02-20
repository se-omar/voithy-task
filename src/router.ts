import { Router } from 'express'
import patientRoutes from './api/patients/patients.routes'

const router = Router()
router.use('/Patient', patientRoutes)

export default router
