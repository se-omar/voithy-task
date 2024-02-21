import { type NextFunction, type Response } from 'express'
import { type CustomReq } from '../utils/customReq'
import { Audit } from './database'

export const auditMiddleware = async (
  req: CustomReq<any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userAgent = req.headers['user-agent'] ?? ''
    console.log('request url: ', req.url)
    console.log('request method: ', req.method)
    console.log('request ip: ', req.ip)
    console.log('request agent: ', userAgent)

    const audit = new Audit({
      userAgent,
      userId: '',
      ipAddress: req.ip,
      occuredAt: Date.now(),
      httpMethod: req.method,
      resourceUrl: req.url
    })

    await audit.save()
  } catch (err) {
    console.log('audit error: ', err)
    next()
  }
  next()
}
