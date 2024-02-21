import { type PatientGenderKind } from '@ahryman40k/ts-fhir-types/lib/R4'

export interface ReqPatient {
  givenName: string
  familyName: string
  birthDate: Date
  mobileNumber: string
  address: string
  city: string
  country: string
  deceased: boolean
  active: boolean
  gender: PatientGenderKind
}
