import { Router } from 'express'
import { createPatient, getPatientById } from './patients.controller'

const patientRoutes = Router()

patientRoutes.get('/:id', getPatientById)
patientRoutes.post('/', createPatient)

export default patientRoutes
