import { type IPatient } from '@ahryman40k/ts-fhir-types/lib/R4'
import { Patient } from '../../config/database'

const createPatient = async (patient: Partial<IPatient>) => {
  const patientModel = new Patient(patient)
  await patientModel.save()
  return patientModel
}

const getPatientById = async (id: string) => {
  const patient = await Patient.findById(id)
  return patient
}

export const dal = { createPatient, getPatientById }
