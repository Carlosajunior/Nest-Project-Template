import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { AccessTokenDTO } from './access-token.dto';

export class ChangePasswordDTO extends AccessTokenDTO {
  @ApiProperty({
    title: 'password',
    type: String,
    required: true,
    description: ' User`s current password.',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+])[A-Za-z\d-!@#$%^&*()_+]{8,}$/,
    {
      message:
        'Password must contain be 8 digit at least, have 1 upper case letter, 1 lower case letter, 1 number and 1 special character',
    },
  )
  current_password: string;

  @ApiProperty({
    title: 'password',
    type: String,
    required: true,
    description: 'User`s new password.',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+])[A-Za-z\d-!@#$%^&*()_+]{8,}$/,
    {
      message:
        'Password must contain be 8 digit at least, have 1 upper case letter, 1 lower case letter, 1 number and 1 special character',
    },
  )
  new_password: string;
}
