import { User } from '../../config/database'
import { type IUser } from './users.models'

const findUser = async (data: Partial<IUser>) => {
  const dbUser = await User.findOne(data)
  return dbUser
}

const saveUser = async (user: IUser, hashedPassword: string) => {
  const newUser = new User({
    email: user.email,
    name: user.name,
    password: hashedPassword
  })
  await newUser.save()
  return newUser
}

export const userDal = {
  findUser,
  saveUser
}
