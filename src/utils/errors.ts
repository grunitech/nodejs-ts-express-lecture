import { Response } from 'express';

export function handleError(res: Response, message: string, status = 400) {
  res.status(400).send({ message });
}
