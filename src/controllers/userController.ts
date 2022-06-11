import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  // Authorized,
} from 'routing-controllers';
import { IUser } from '../models/userModel';

import { UserService } from '../services/userService';

@JsonController('/user')
/**
 * Only Accessible by Admin and Editor
 */
// @Authorized(['ADMIN', 'EDITOR'])
export class UserController {
  private userService = new UserService();
  @Get()
  getAll() {
    const result = this.userService.getAllUsers();
    return result;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    const result = this.userService.getUserById(id);
    return result;
  }

  /**
   * Only Admin can Add, remove or delete user.
   */

  // @Authorized(['ADMIN'])
  @Post('')
  createUser(@Body() user: IUser) {
    const result = this.userService.createUser(user);
    return result;
  }

  // @Authorized(['ADMIN'])
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: IUser) {
    const result = this.userService.updateUserById(id, user);
    return result;
  }

  // @Authorized(['ADMIN'])
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    const result = this.userService.deleteUserById(id);
    return result;
  }
}
