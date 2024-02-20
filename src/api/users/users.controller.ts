import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
  const username = req.body.username
  const password = req.body.password
  const user = { name: username }

  // In a real application, you should validate the username and password here

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET ?? '', {
    expiresIn: '300s'
  })

  res.json({ accessToken })
}
