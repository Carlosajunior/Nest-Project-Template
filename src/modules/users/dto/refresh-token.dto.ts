import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty({
    title: 'refresh_token',
    type: String,
    required: true,
    description: ' User`s refresh token obtained after login.',
  })
  @IsNotEmpty()
  @IsString()
  REFRESH_TOKEN: string;
}
