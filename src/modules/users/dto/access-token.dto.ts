import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class AccessTokenDTO {
  @ApiProperty({
    title: 'access_token',
    type: String,
    required: true,
    description: ' User`s access token obtained after login.',
  })
  @IsNotEmpty()
  @IsJWT()
  access_token: string;
}
