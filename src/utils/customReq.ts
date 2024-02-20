import { type Request } from 'express'
export interface CustomReq<T> extends Request {
  body: T
  user?: any
}
