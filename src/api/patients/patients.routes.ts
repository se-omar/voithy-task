import { Router } from 'express'
import { createPatient } from './patients.controller'

const patientRoutes = Router()

patientRoutes.post('/', createPatient)

export default patientRoutes
