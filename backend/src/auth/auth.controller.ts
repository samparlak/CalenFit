import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, AuthResponse, AuthTokens } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto';
import { CurrentUser } from '../common/decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // =========================================
    // REGISTER
    // =========================================
    @Post('register')
    @ApiOperation({ summary: 'Yeni kullanıcı kaydı' })
    @ApiResponse({ status: 201, description: 'Kayıt başarılı' })
    @ApiResponse({ status: 409, description: 'Email zaten kayıtlı' })
    async register(@Body() dto: RegisterDto): Promise<AuthResponse> {
        return this.authService.register(dto);
    }

    // =========================================
    // LOGIN
    // =========================================
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Kullanıcı girişi' })
    @ApiResponse({ status: 200, description: 'Giriş başarılı' })
    @ApiResponse({ status: 401, description: 'Email veya şifre hatalı' })
    async login(@Body() dto: LoginDto): Promise<AuthResponse> {
        return this.authService.login(dto);
    }

    // =========================================
    // REFRESH TOKEN
    // =========================================
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Access token yenileme' })
    @ApiResponse({ status: 200, description: 'Token yenilendi' })
    @ApiResponse({ status: 401, description: 'Geçersiz refresh token' })
    async refreshTokens(@Body() dto: RefreshTokenDto): Promise<AuthTokens> {
        return this.authService.refreshTokens(dto.refreshToken);
    }

    // =========================================
    // LOGOUT
    // =========================================
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Çıkış yap' })
    @ApiResponse({ status: 200, description: 'Çıkış başarılı' })
    async logout(@Body() dto: RefreshTokenDto): Promise<{ message: string }> {
        return this.authService.logout(dto.refreshToken);
    }

    // =========================================
    // LOGOUT ALL DEVICES
    // =========================================
    @Post('logout-all')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Tüm cihazlardan çıkış yap' })
    @ApiResponse({ status: 200, description: 'Tüm oturumlar kapatıldı' })
    @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
    async logoutAll(@CurrentUser('id') userId: string): Promise<{ message: string }> {
        return this.authService.logoutAll(userId);
    }

    // =========================================
    // GET CURRENT USER (Protected Route Example)
    // =========================================
    @Post('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Mevcut kullanıcı bilgilerini getir' })
    @ApiResponse({ status: 200, description: 'Kullanıcı bilgileri' })
    @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
    async getMe(@CurrentUser() user: any): Promise<{ user: any }> {
        return { user };
    }
}
