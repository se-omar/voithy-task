import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../../config/database'
import { type IUser } from './users.models'
import { jsonRes } from '../../utils/JsonRes'
import bcrypt from 'bcrypt'
import { type CustomReq } from '../../utils/customReq'

export const login = async (req: Request, res: Response) => {
  const email = req.body.email as string
  const password = req.body.password as string
  console.log(req.body)

  try {
    if (!email || !password) {
      return res.status(400).send(jsonRes({}, 'Invalid username or password'))
    }

    const dbUser = await User.findOne({ email })
    if (!dbUser) {
      return res.status(404).send(jsonRes({}, 'User not found'))
    }

    const ok = await bcrypt.compare(password, dbUser?.password ?? '')
    if (!ok) {
      return res.status(400).send(jsonRes({}, 'Invalid username or password'))
    }

    const user = { email, id: dbUser?._id }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET ?? '', {
      expiresIn: '300s'
    })

    return res.status(200).send(jsonRes({ accessToken, expiresIn: '300s' }))
  } catch (err) {
    console.log(err)
    return res.status(500).send(jsonRes({}, 'Something went wrong'))
  }
}

export const signup = async (req: CustomReq<IUser>, res: Response) => {
  try {
    const user = req.body
    if (!user.password) {
      return res.status(409).send(jsonRes({}, 'Invalid email or password'))
    }

    const dbUser = await User.findOne({ email: user.email })
    if (dbUser !== null) {
      return res.status(409).send(jsonRes({}, 'User already exists'))
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = new User({
      email: user.email,
      name: user.name,
      password: hashedPassword
    })
    await newUser.save()
    return res.status(201).send(jsonRes(newUser, 'User created successfully'))
  } catch (err) {
    console.log(err)
    res.status(500).send(jsonRes({}, 'Something went wrong'))
  }
}
