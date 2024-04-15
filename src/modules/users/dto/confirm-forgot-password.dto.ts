import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class ConfirmForgotPasswordDTO {
  @ApiProperty({
    title: 'email',
    type: String,
    required: true,
    description: ' User`s e-mail.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'password',
    type: String,
    required: true,
    description: ' User`s password.',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+])[A-Za-z\d-!@#$%^&*()_+]{8,}$/,
    {
      message:
        'Password must contain be 8 digit at least, have 1 upper case letter, 1 lower case letter, 1 number and 1 special character',
    },
  )
  password: string;

  @ApiProperty({
    title: 'confirmation_code',
    type: String,
    required: true,
    description: ' 6-digits confirmation code sent to user`s e-mail.',
  })
  @IsNotEmpty()
  @Matches(/^\d{6}$/, { message: 'The confirmation code must be 6-digit only' })
  confirmation_code: string;
}
