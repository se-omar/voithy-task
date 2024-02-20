import { type Request } from 'express'
export interface CustomReq extends Request {
  user?: any
}
