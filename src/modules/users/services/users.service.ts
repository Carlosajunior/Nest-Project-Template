import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SignUpUserDTO } from '../dto/signup-user.dto';
import { LoginDTO } from '../dto/login-user.dto';
import { cognitoIdentityProvider } from 'src/config/cognito/cognito.service';
import { VerifyEmailDTO } from '../dto/verify-email.dto';
import { InitiateForgotPasswordFlowDTO } from '../dto/initiate-forgot-password-flow.dto';
import { ConfirmForgotPasswordDTO } from '../dto/confirm-forgot-password.dto';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { AccessTokenDTO } from '../dto/access-token.dto';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';
import { ResendConfirmationCodeDTO } from '../dto/resend-confirmation-code.dto';

@Injectable()
export class UsersService {
  async login(loginDTO: LoginDTO) {
    try {
      return (
        await cognitoIdentityProvider.initiateAuth({
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: process.env.COGNITO_CLIENT_ID,
          AuthParameters: {
            USERNAME: loginDTO.email,
            PASSWORD: loginDTO.password,
          },
        })
      ).AuthenticationResult;
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async signUp(singUpUserDTO: SignUpUserDTO) {
    try {
      return (
        await cognitoIdentityProvider.signUp({
          ClientId: process.env.COGNITO_CLIENT_ID,
          Password: singUpUserDTO.password,
          Username: singUpUserDTO.email,
          UserAttributes: [
            {
              Name: 'name',
              Value: singUpUserDTO.name,
            },
            {
              Name: 'email',
              Value: singUpUserDTO.email,
            },
            {
              Name: 'phone_number',
              Value: singUpUserDTO.phone_number,
            },
            {
              Name: 'birthdate',
              Value: singUpUserDTO.birthdate,
            },
          ],
        })
      ).CodeDeliveryDetails;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async verifyEmail(verifyEmailDTO: VerifyEmailDTO) {
    try {
      return await cognitoIdentityProvider.confirmSignUp({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: verifyEmailDTO.email,
        ConfirmationCode: verifyEmailDTO.confirmation_code,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async initiateForgotPasswordFlow(
    initiateForgotPasswordFlowDTO: InitiateForgotPasswordFlowDTO,
  ) {
    try {
      return await cognitoIdentityProvider.forgotPassword({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: initiateForgotPasswordFlowDTO.email,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async confirmForgotPassword(
    confirmForgotPasswordDTO: ConfirmForgotPasswordDTO,
  ) {
    try {
      return await cognitoIdentityProvider.confirmForgotPassword({
        ClientId: process.env.COGNITO_CLIENT_ID,
        ConfirmationCode: confirmForgotPasswordDTO.confirmation_code,
        Password: confirmForgotPasswordDTO.password,
        Username: confirmForgotPasswordDTO.email,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async changePassword(changePasswordDTO: ChangePasswordDTO) {
    try {
      return await cognitoIdentityProvider.changePassword({
        AccessToken: changePasswordDTO.access_token,
        PreviousPassword: changePasswordDTO.current_password,
        ProposedPassword: changePasswordDTO.new_password,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteUser(accessTokenDTO: AccessTokenDTO) {
    try {
      return await cognitoIdentityProvider.deleteUser({
        AccessToken: accessTokenDTO.access_token,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async refreshToken(refreshTokenDTO: RefreshTokenDTO) {
    try {
      return (
        await cognitoIdentityProvider.initiateAuth({
          AuthFlow: 'REFRESH_TOKEN',
          AuthParameters: {
            REFRESH_TOKEN: refreshTokenDTO.REFRESH_TOKEN,
          },
          ClientId: process.env.COGNITO_CLIENT_ID,
        })
      ).AuthenticationResult;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async signOut(accessTokenDTO: AccessTokenDTO) {
    try {
      return await cognitoIdentityProvider.globalSignOut({
        AccessToken: accessTokenDTO.access_token,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async resendConfirmationCode(
    resendConfirmationCodeDTO: ResendConfirmationCodeDTO,
  ) {
    try {
      return await cognitoIdentityProvider.resendConfirmationCode({
        Username: resendConfirmationCodeDTO.email,
        ClientId: process.env.COGNITO_CLIENT_ID,
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
