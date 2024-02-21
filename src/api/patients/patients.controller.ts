import { type Request, type Response } from 'express'
import {
  AddressTypeKind,
  AddressUseKind,
  RTTI_Patient
} from '@ahryman40k/ts-fhir-types/lib/R4'
import { either as E } from 'fp-ts'
import { jsonRes } from '../../utils/JsonRes'
import { Patient } from '../../config/database'
import { type CustomReq } from '../../utils/customReq'

interface reqPatient {
  givenName: string
  familyName: string
  birthDate: Date
  mobileNumber: string
  address: string
  city: string
  country: string
  deceased: boolean
  active: boolean
  gender: 'male' | 'female' | 'other' | 'unknown'
}

const mapPatientData = (data: reqPatient) => {
  return {
    resourceType: 'Patient',
    deceasedBoolean: data.deceased,
    active: data.active,
    name: [
      { given: [data.givenName], family: data.familyName, use: 'official' }
    ],
    telecom: [{ value: data.mobileNumber, use: 'mobile', system: 'phone' }],
    address: [
      {
        city: data.city,
        country: data.country,
        text: data.address,
        type: AddressTypeKind._both,
        use: AddressUseKind._home
      }
    ],
    gender: data.gender
  }
}

export const createPatient = async (
  req: CustomReq<reqPatient>,
  res: Response
) => {
  const data = req.body
  const patient = mapPatientData(data)
  const result = RTTI_Patient.decode(patient)
  try {
    if (E.isRight(result)) {
      const patientModel = new Patient(patient)
      await patientModel.save()
      res
        .status(200)
        .send(jsonRes(patientModel, 'Patient created successfully'))
    } else {
      console.log(result.left)
      res.status(400).send(jsonRes({}, 'wrong Patient data'))
    }
  } catch (err) {
    console.log('err: ', err)
    res.status(500).send(jsonRes({}, 'Error while adding patient'))
  }
}

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send(jsonRes({}, 'Invalid ID'))
  }
  const patient = await Patient.findById(id)
  if (!patient) {
    return res.status(404).send(jsonRes({}, 'Patient not found'))
  }

  return res.status(200).send(jsonRes(patient, 'patient found!'))
}
