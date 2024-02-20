import { type Request, type Response } from 'express'
import { type IPatient, RTTI_Patient } from '@ahryman40k/ts-fhir-types/lib/R4'
import { either as E } from 'fp-ts'
import { jsonRes } from '../../utils/JsonRes'
import { Patient } from '../../db/database'

export const createPatient = async (req: Request, res: Response) => {
  // const patient: IPatient = req.body
  const result = RTTI_Patient.decode(req.body)

  try {
    if (!E.isRight(result)) {
      const patient = new Patient(req.body)
      await patient.save()
      res.status(200).send(jsonRes(patient, 'Patient created successfully'))
    } else {
      res.status(400).send(jsonRes({}, 'wrong Patient data'))
    }
  } catch (err) {
    console.log('err: ', err)
    res.status(500).send(jsonRes({}, 'Error while adding patient'))
  }
}
