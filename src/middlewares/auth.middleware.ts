import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET, Role } from '../constants';
import jwt from 'jsonwebtoken';

interface IJwtDecoded {
  id: number;
  role: Role;
}

export const authenticateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token: string = req.cookies.token;
    if (!token) {
      res.redirect('/auth/login');
    } else {
      const decoded = jwt.verify(token, JWT_SECRET) as IJwtDecoded;
      if (!decoded) {
        res.redirect('/auth/login');
      }
      next();
    }
  } catch (error) {
    res.redirect('/auth/login');
  }
};
