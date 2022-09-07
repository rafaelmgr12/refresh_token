import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, "499a6da6-e45e-4021-a74e-0b73cfc18e54");
    return next();
  } catch (err) {
    return res.status(401).end();
  }



}
