import { JsonController, Body, Post } from 'routing-controllers';
import { LoginDTO } from '../dtos/loginDTO';
import { AuthService } from '../services/authService';

@JsonController('/login')

export class AuthController {
  private authService = new AuthService();
  @Post()
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }
}
