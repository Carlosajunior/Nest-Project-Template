import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { SignUpUserDTO } from '../dto/signup-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../dto/login-user.dto';
import { VerifyEmailDTO } from '../dto/verify-email.dto';
import { InitiateForgotPasswordFlowDTO } from '../dto/initiate-forgot-password-flow.dto';
import { ConfirmForgotPasswordDTO } from '../dto/confirm-forgot-password.dto';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { AccessTokenDTO } from '../dto/access-token.dto';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';
import { ResendConfirmationCodeDTO } from '../dto/resend-confirmation-code.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({
    summary:
      'Route to authenticate a user with it`s email and password, returning the corresponding acess,id and refresh token.',
  })
  async login(@Body() loginDTO: LoginDTO) {
    try {
      return await this.usersService.login(loginDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Route to create a new user credentials for login.',
  })
  async create(@Body() signUpUserDTO: SignUpUserDTO) {
    try {
      return await this.usersService.signUp(signUpUserDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify-email')
  @ApiOperation({
    summary: 'Route to verify user`s e-mail with the 9-digit sent to it.',
  })
  async verifyEmail(@Body() verifyEmailDTO: VerifyEmailDTO) {
    try {
      return await this.usersService.verifyEmail(verifyEmailDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('initiate-forgot-password')
  @ApiOperation({
    summary:
      'Route to initiate forgot password flow, sending an e-mail to user confirm it.',
  })
  async initiateForgotPasswordFlow(
    @Body() initiateForgotPasswordFlowDTO: InitiateForgotPasswordFlowDTO,
  ) {
    try {
      return await this.usersService.initiateForgotPasswordFlow(
        initiateForgotPasswordFlowDTO,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('confirm-forgot-password')
  @ApiOperation({
    summary:
      'Route to change password for a new one when activated forgot password flow.',
  })
  async confirmForgotPassword(
    @Body() confirmForgotPasswordDTO: ConfirmForgotPasswordDTO,
  ) {
    try {
      return await this.usersService.confirmForgotPassword(
        confirmForgotPasswordDTO,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('change-password')
  @ApiOperation({
    summary: 'Route to change password for a new one when logged.',
  })
  async changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
    try {
      return await this.usersService.changePassword(changePasswordDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('delete-user')
  @ApiOperation({
    summary: 'Route to delete user.',
  })
  async deleteUser(@Body() accessTokenDTO: AccessTokenDTO) {
    try {
      return await this.usersService.deleteUser(accessTokenDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Route to refresh token.',
  })
  async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
    try {
      return await this.usersService.refreshToken(refreshTokenDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signout')
  @ApiOperation({
    summary: 'Route to signout revoking all tokens from user.',
  })
  async signOut(@Body() accessTokenDTO: AccessTokenDTO) {
    try {
      return await this.usersService.signOut(accessTokenDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('resend-confirmation-code')
  @ApiOperation({
    summary: 'Route to resend confirmation code to user`s e-mail.',
  })
  async resendConfirmationCode(
    @Body() resendConfirmationCodeDTO: ResendConfirmationCodeDTO,
  ) {
    try {
      return await this.usersService.resendConfirmationCode(
        resendConfirmationCodeDTO,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
