import { Request, Response } from 'express'

export function exampleResponse(req: Request, res: Response) { res.send('Hello world') }
