import { Request, type NextFunction, type Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { type CustomReq } from '../utils/customReq'
import { jsonRes } from '../utils/JsonRes'

export const authenticateToken = (
  req: CustomReq<any>,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null) return res.status(401).send(jsonRes({}, 'Unauthorized'))

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? '', (err, user) => {
    if (err !== null) return res.status(403).send(jsonRes({}, 'Forbidden'))
    req.user = user
    next()
  })
}
