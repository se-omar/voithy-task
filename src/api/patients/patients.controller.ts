import { type Request, type Response } from 'express'
import {
  AddressTypeKind,
  AddressUseKind,
  RTTI_Patient
} from '@ahryman40k/ts-fhir-types/lib/R4'
import { either as E } from 'fp-ts'
import { jsonRes } from '../../utils/JsonRes'
import { Patient } from '../../config/database'

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

export const createPatient = async (req: Request, res: Response) => {
  const patient = mapPatientData(req.body as reqPatient)
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
