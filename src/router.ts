import { Router } from 'express'
import patientRoutes from './api/patients/patients.routes'

const router = Router()
router.use('/patients', patientRoutes)

export default router
