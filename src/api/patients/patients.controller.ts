import { type Request, type Response } from 'express'
import {
  type IPatient,
  RTTI_Patient
} from '@ahryman40k/ts-fhir-types/lib/R4'
import { either as E } from 'fp-ts'

export const createPatient = (req: Request, res: Response) => {
  const patient: IPatient = req.body
  const result = RTTI_Patient.decode(patient)

  if (E.isRight(result)) {
    res.status(200).send('patient created successfully')
  } else {
    res.status(500).send('something went wrong')
  }
}
