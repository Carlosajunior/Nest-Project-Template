import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class VerifyEmailDTO {
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
    title: 'confirmation_code',
    type: String,
    required: true,
    description: ' 6-digits confirmation code sent to user`s e-mail.',
  })
  @IsNotEmpty()
  @Matches(/^\d{6}$/, { message: 'The confirmation code must be 6-digit only' })
  confirmation_code: string;
}
