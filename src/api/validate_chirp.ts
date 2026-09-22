import type { Request, Response } from "express";

export async function handlerValidateChirp(req: Request, res: Response) {
  type parameters = {
    body: string;
  };
  
  let body = ""; // 1. Initialize

  // 2. Listen for data events
  req.on("data", (chunk) => {
    body += chunk;
  });

  let params: parameters;
  // 3. Listen for end events
  req.on("end", () => {
    try {
      params = JSON.parse(body);
    } catch (error) {
      res.header("Content-Type", "application/json");
      const payload = JSON.stringify({ error: "Invalid JSON" })
      res.status(400).send(payload);
    }
    if (params.body.length > 140) {
      res.header("Content-Type", "application/json");
      const payload = JSON.stringify({ error: 'Chirp is too long' })
      res.status(400).send(payload);
    }
    res.header("Content-Type", "application/json");
    const payload = JSON.stringify({ valid: true })
    res.status(200).send(payload);
  });
}