import type { Request, Response } from "express";

export async function handlerValidateChirp(req: Request, res: Response) {
  type parameters = {
    body: string;
  };
  const params: parameters = req.body;
  if (params.body.length > 140) {
    res.header("Content-Type", "application/json");
    const payload = JSON.stringify({ error: 'Chirp is too long' })
    res.status(400).send(payload);
  }
  res.header("Content-Type", "application/json");
  const payload = JSON.stringify({ valid: true })
  res.status(200).send(payload);
}