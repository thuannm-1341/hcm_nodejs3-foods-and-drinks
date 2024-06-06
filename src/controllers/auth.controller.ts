import { RegisterDto } from './../commons/dtos/register.dto';
import { AuthService } from '../services/auth.service';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import {plainToClass} from 'class-transformer';
import { validate } from 'class-validator';
import { handleError } from '../commons/utils';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from '../commons/dtos/login.dto';
import { CustomSessionData } from '../interfaces/session.interface';
import { AdminService } from '../services/admin.service';
import { AdminEntity } from '../entities/admin.entity';

export class AuthController {
  private readonly authService: AuthService;
  private readonly userService: UserService;
  private readonly adminService: AdminService;
  constructor(){
    this.authService = new AuthService();
    this.userService = new UserService();
    this.adminService = new AdminService();
  }
  
  public registerGet = asyncHandler(
    async (req: Request, res: Response) => {
      res.render('auth/register');
      return;
    },
  );

  public registerPost = asyncHandler(
    async (req: Request, res: Response) => {
      const registerDto = plainToClass(RegisterDto, req.body);
      const rawErrors = await validate(registerDto);
      const data = {...req.body};
      if( rawErrors.length > 0 ){
        const errors = handleError(rawErrors, req, res);
        return res.render('auth/register', {errors, data});
      }
      const registerResult = await this.userService.registerUser(registerDto);
      if(!(registerResult instanceof UserEntity)){
        return res.render('auth/register', {errors: registerResult, data});
      }
      (req.session as CustomSessionData).user = registerResult;
      const accessToken = this.authService.createJwt(registerResult);
      res.cookie('token', accessToken);
      res.redirect('/home');
    },
  );

  public loginGet = asyncHandler(
    async (req: Request, res: Response) => {
      res.render('auth/login');
      return;
    },
  );

  public loginPost = asyncHandler(
    async (req: Request, res: Response) => {
      const loginDto = plainToClass(LoginDto, req.body);
      const rawErrors = await validate(loginDto);
      const data = {...req.body};
      if( rawErrors.length > 0 ){
        const errors = handleError(rawErrors, req, res);
        return res.render('auth/login', {errors, data});
      }
      const loginResult = await this.userService.userLogin(loginDto);
      if(!(loginResult instanceof UserEntity)){
        return res.render('auth/login', {errors: loginResult, data});
      }
      (req.session as CustomSessionData).user = loginResult;
      const accessToken = this.authService.createJwt(loginResult);
      res.cookie('token', accessToken);
      res.redirect('/home');
    },
  );

  public adminLoginGet = asyncHandler(
    async (req: Request, res: Response) => {
      res.render('auth/admin-login');
      return;
    },
  );

  public adminLoginPost = asyncHandler(
    async (req: Request, res: Response) => {
      const loginDto = plainToClass(LoginDto, req.body);
      const rawErrors = await validate(loginDto);
      const data = {...req.body};
      if( rawErrors.length > 0 ){
        const errors = handleError(rawErrors, req, res);
        return res.render('auth/admin-login', {errors, data});
      }
      const loginResult = await this.adminService.adminLogin(loginDto);
      if(!(loginResult instanceof AdminEntity)){
        return res.render('auth/admin-login', {errors: loginResult, data});
      }
      (req.session as CustomSessionData).admin = loginResult;
      const accessToken = this.authService.createJwt(loginResult);
      res.cookie('token', accessToken);
      res.redirect('/admin/home');
    },
  );

  public logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('token');
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  });
}
