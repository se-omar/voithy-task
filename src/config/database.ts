import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'
import { type IPatient } from '@ahryman40k/ts-fhir-types/lib/R4'
import { type IUser } from '../api/users/users.models'

const url = process.env.MONGO_DB ?? ''
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected To database :)')
  })
  .catch((err) => {
    console.log('error', err)
  })

const patientSchema = new Schema<IPatient>(
  {
    active: Boolean,
    address: [
      {
        use: String,
        type: String,
        text: String,
        city: String,
        country: String
      }
    ],
    name: [{ given: [String], family: String, use: String }],
    gender: String,
    telecom: [{ system: String, value: String, use: String }],
    birthDate: String,
    deceasedBoolean: Boolean
  },
  { strict: true, typeKey: '$type' }
)

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export const Patient = mongoose.model('Patient', patientSchema)
export const User = mongoose.model('User', userSchema)
export default mongoose
