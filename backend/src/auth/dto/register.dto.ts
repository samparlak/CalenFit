import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'Ahmet Yılmaz', description: 'User full name' })
    @IsString()
    @IsNotEmpty({ message: 'Ad soyad zorunludur' })
    @MinLength(2, { message: 'Ad soyad en az 2 karakter olmalıdır' })
    @MaxLength(100, { message: 'Ad soyad en fazla 100 karakter olabilir' })
    fullName: string;

    @ApiProperty({ example: 'ahmet@example.com', description: 'User email address' })
    @IsEmail({}, { message: 'Geçerli bir email adresi giriniz' })
    @IsNotEmpty({ message: 'Email zorunludur' })
    email: string;

    @ApiProperty({ example: 'SecurePass123!', description: 'User password (min 8 chars)' })
    @IsString()
    @IsNotEmpty({ message: 'Şifre zorunludur' })
    @MinLength(8, { message: 'Şifre en az 8 karakter olmalıdır' })
    @MaxLength(128, { message: 'Şifre en fazla 128 karakter olabilir' })
    password: string;
}
