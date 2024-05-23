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

export class AuthController {
  private readonly authService: AuthService;
  private readonly userService: UserService;
  constructor(){
    this.authService = new AuthService();
    this.userService = new UserService();
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
      const accessToken = this.authService.createJwt(registerResult);
      res.cookie("token", accessToken, { httpOnly: true });
      res.redirect('/');
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
      const accessToken = this.authService.createJwt(loginResult);
      res.cookie("token", accessToken, { httpOnly: true });
      res.redirect('/');
    },
  );
}
