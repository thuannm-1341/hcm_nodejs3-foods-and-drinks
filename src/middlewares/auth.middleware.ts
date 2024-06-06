import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET, Role } from '../constants';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { CustomSessionData } from '../interfaces/session.interface';

const userService = new UserService();
const adminService = new AdminService();

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
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded) {
        res.redirect('/auth/login');
      } else {
        const user = await userService.findById((decoded as IJwtDecoded).id);
        if (user !== null) {
          (req.session as CustomSessionData).user = user;
        } else {
          res.redirect('/auth/login');
        }
      }
      next();
    }
  } catch (error) {
    res.redirect('/auth/login');
  }
};

export const authenticateAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token: string = req.cookies.token;
    if (!token) {
      res.redirect('/auth/admin-login');
    } else {
      const decoded = jwt.verify(token, JWT_SECRET) as IJwtDecoded;
      if (!decoded || decoded.role != Role.ADMIN) {
        res.redirect('/auth/admin-login');
      } else {
        const admin = await adminService.findById(decoded.id);
        if (admin !== null) {
          (req.session as CustomSessionData).admin = admin;
        } else {
          res.redirect('/auth/admin-login');
        }
      }
      next();
    }
  } catch (error) {
    res.redirect('/auth/admin-login');
  }
};
