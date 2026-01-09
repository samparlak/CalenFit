import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({ description: 'Refresh token for getting new access token' })
    @IsString()
    @IsNotEmpty({ message: 'Refresh token zorunludur' })
    refreshToken: string;
}
