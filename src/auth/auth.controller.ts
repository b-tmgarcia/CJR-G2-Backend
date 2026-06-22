import { Controller, Get, Post, Body, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorators/isPublic.decorator';
import { LoginRequestBody } from './dto/loginRequestBody.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequestBody: LoginRequestBody) {
    return this.authService.login(loginRequestBody);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}