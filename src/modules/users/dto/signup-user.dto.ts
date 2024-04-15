import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class SignUpUserDTO {
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
    title: 'name',
    type: String,
    required: true,
    description: ' User`s full name.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'phone_number',
    type: String,
    required: true,
    description:
      ' User`s phone_number. The phone number must follow the pattern: +55(Brazil code), code area(state), the 9-8 digits phone number.',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+55\d{10,11}$/m, {
    message:
      'The phone number must follow the pattern: +55(Brazil code), code area(state), the 9-8 digits phone number',
  })
  phone_number: string;

  @ApiProperty({
    title: 'birthdate',
    type: String,
    required: true,
    description: ' User`s birthdate on the format AAAA-MM-DD.',
  })
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;
}
