import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'ahmet@example.com', description: 'User email address' })
    @IsEmail({}, { message: 'Geçerli bir email adresi giriniz' })
    @IsNotEmpty({ message: 'Email zorunludur' })
    email: string;

    @ApiProperty({ example: 'SecurePass123!', description: 'User password' })
    @IsString()
    @IsNotEmpty({ message: 'Şifre zorunludur' })
    password: string;
}
