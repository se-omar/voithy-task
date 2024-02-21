import { type Request, type Response } from 'express'
import {
  AddressTypeKind,
  AddressUseKind,
  type IPatient,
  RTTI_Patient,
  HumanNameUseKind,
  ContactPointUseKind,
  ContactPointSystemKind
} from '@ahryman40k/ts-fhir-types/lib/R4'
import { either as E } from 'fp-ts'
import { jsonRes } from '../../utils/JsonRes'
import { type CustomReq } from '../../utils/customReq'
import { type ReqPatient } from './patients.models'
import { patientDal } from './patients.dal'

const mapPatientData = (data: ReqPatient) => {
  const patient: IPatient = {
    resourceType: 'Patient',
    deceasedBoolean: data.deceased,
    active: data.active,
    name: [
      {
        given: [data.givenName],
        family: data.familyName,
        use: HumanNameUseKind._official
      }
    ],
    telecom: [
      {
        value: data.mobileNumber,
        use: ContactPointUseKind._mobile,
        system: ContactPointSystemKind._phone
      }
    ],
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
  return patient
}

export const createPatient = async (
  req: CustomReq<ReqPatient>,
  res: Response
) => {
  const data = req.body
  const patient = mapPatientData(data)
  const result = RTTI_Patient.decode(patient)
  try {
    if (E.isRight(result)) {
      const patientModel = await patientDal.createPatient(patient)
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
  const patient = await patientDal.getPatientById(id)
  if (!patient) {
    return res.status(404).send(jsonRes({}, 'Patient not found'))
  }

  return res.status(200).send(jsonRes(patient, 'patient found!'))
}
