import { JsonController, Body, Post } from 'routing-controllers';
import { LoginDTO } from '../dtos/loginDTO';
import { AuthService } from '../services/authService';

@JsonController('/login')
// all the validations
// mapping of request to service
// mapping of service result to API response
export class AuthController {
  private authService = new AuthService();
  @Post()
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }
}
