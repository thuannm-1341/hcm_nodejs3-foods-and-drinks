import { AdminService } from '../../services/admin.service';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { AdminNavBar } from '../../constants/admin';
import { CustomSessionData } from '../../interfaces/session.interface';

export class AdminController {
  private readonly adminService: AdminService;
  constructor() {
    this.adminService = new AdminService();
  }

  public getAdminDashboard = asyncHandler(
    async (req: Request, res: Response) => {
      const admin = (req.session as CustomSessionData).admin;
      return res.render('admin/home', {
        admin, 
        currentSite: AdminNavBar.DASHBOARD,
      });
    },
  );
}
