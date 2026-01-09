import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';

// Response types - Exported for controller
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        fullName: string;
        role: string;
    };
    tokens: AuthTokens;
}

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    // =========================================
    // REGISTER
    // =========================================
    async register(dto: RegisterDto): Promise<AuthResponse> {
        // Check if email already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
        });

        if (existingUser) {
            throw new ConflictException('Bu email adresi zaten kayıtlı');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(dto.password, 12);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email: dto.email.toLowerCase(),
                password: hashedPassword,
                fullName: dto.fullName,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
            },
        });

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email, user.role);

        // Save refresh token to database
        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return {
            user,
            tokens,
        };
    }

    // =========================================
    // LOGIN
    // =========================================
    async login(dto: LoginDto): Promise<AuthResponse> {
        // Find user
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
        });

        if (!user) {
            throw new UnauthorizedException('Email veya şifre hatalı');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Hesabınız devre dışı bırakılmış');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email veya şifre hatalı');
        }

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email, user.role);

        // Save refresh token
        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return {
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
            tokens,
        };
    }

    // =========================================
    // REFRESH TOKEN
    // =========================================
    async refreshTokens(refreshToken: string): Promise<AuthTokens> {
        // Verify refresh token
        let payload: JwtPayload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
        } catch {
            throw new UnauthorizedException('Geçersiz veya süresi dolmuş token');
        }

        // Check if token exists in database
        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });

        if (!storedToken || storedToken.userId !== payload.sub) {
            throw new UnauthorizedException('Geçersiz token');
        }

        if (storedToken.expiresAt < new Date()) {
            // Clean up expired token
            await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
            throw new UnauthorizedException('Token süresi dolmuş');
        }

        if (!storedToken.user.isActive) {
            throw new UnauthorizedException('Hesap devre dışı');
        }

        // Delete old refresh token (token rotation)
        await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

        // Generate new tokens
        const tokens = await this.generateTokens(
            storedToken.user.id,
            storedToken.user.email,
            storedToken.user.role,
        );

        // Save new refresh token
        await this.saveRefreshToken(storedToken.user.id, tokens.refreshToken);

        return tokens;
    }

    // =========================================
    // LOGOUT
    // =========================================
    async logout(refreshToken: string): Promise<{ message: string }> {
        // Delete the refresh token from database
        try {
            await this.prisma.refreshToken.delete({
                where: { token: refreshToken },
            });
        } catch {
            // Token might not exist, which is fine
        }

        return { message: 'Başarıyla çıkış yapıldı' };
    }

    // =========================================
    // LOGOUT FROM ALL DEVICES
    // =========================================
    async logoutAll(userId: string): Promise<{ message: string }> {
        await this.prisma.refreshToken.deleteMany({
            where: { userId },
        });

        return { message: 'Tüm cihazlardan çıkış yapıldı' };
    }

    // =========================================
    // HELPER METHODS
    // =========================================
    private async generateTokens(
        userId: string,
        email: string,
        role: string,
    ): Promise<AuthTokens> {
        const payload: JwtPayload = {
            sub: userId,
            email,
            role,
        };

        const accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
        const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

        // Use numeric values for expiresIn (in seconds)
        // 15 minutes = 900 seconds, 7 days = 604800 seconds
        const accessExpiresIn = 900;   // 15 minutes
        const refreshExpiresIn = 604800; // 7 days

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: accessSecret,
                expiresIn: accessExpiresIn,
            }),
            this.jwtService.signAsync(payload, {
                secret: refreshSecret,
                expiresIn: refreshExpiresIn,
            }),
        ]);

        return { accessToken, refreshToken };
    }

    private async saveRefreshToken(
        userId: string,
        token: string,
    ): Promise<void> {
        // Calculate expiration date (7 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await this.prisma.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt,
            },
        });
    }
}
