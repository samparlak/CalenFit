import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';

// Mock bcrypt at the module level
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('$2b$12$hashedpassword'),
    compare: jest.fn().mockResolvedValue(true),
}));

// Import after mocking
import * as bcrypt from 'bcrypt';

// ===========================================
// Mock Factories
// ===========================================
const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    password: '$2b$12$hashedpassword',
    fullName: 'Test User',
    role: 'USER',
    isActive: true,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockPrismaService = {
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
    refreshToken: {
        create: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
    },
};

const mockJwtService = {
    signAsync: jest.fn(),
    verify: jest.fn(),
};

const mockConfigService = {
    get: jest.fn((key: string) => {
        const config: Record<string, string> = {
            JWT_ACCESS_SECRET: 'test-access-secret',
            JWT_REFRESH_SECRET: 'test-refresh-secret',
            JWT_ACCESS_EXPIRATION: '15m',
            JWT_REFRESH_EXPIRATION: '7d',
        };
        return config[key];
    }),
};

// ===========================================
// Test Suite
// ===========================================
describe('AuthService', () => {
    let service: AuthService;
    let prisma: typeof mockPrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: JwtService, useValue: mockJwtService },
                { provide: ConfigService, useValue: mockConfigService },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = mockPrismaService;

        // Reset all mocks before each test
        jest.clearAllMocks();

        // Reset bcrypt mock to default (compare returns true)
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    });

    // ===========================================
    // Service Initialization Tests
    // ===========================================
    describe('initialization', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });
    });

    // ===========================================
    // REGISTER Tests
    // ===========================================
    describe('register', () => {
        const registerDto: RegisterDto = {
            email: 'newuser@example.com',
            password: 'SecurePass123!',
            fullName: 'New User',
        };

        it('should successfully register a new user', async () => {
            // Arrange
            prisma.user.findUnique.mockResolvedValue(null);
            prisma.user.create.mockResolvedValue({
                id: 'new-user-id',
                email: registerDto.email.toLowerCase(),
                fullName: registerDto.fullName,
                role: 'USER',
            });
            prisma.refreshToken.create.mockResolvedValue({});
            mockJwtService.signAsync
                .mockResolvedValueOnce('access-token')
                .mockResolvedValueOnce('refresh-token');

            // Act
            const result = await service.register(registerDto);

            // Assert
            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('tokens');
            expect(result.user.email).toBe(registerDto.email.toLowerCase());
            expect(result.tokens.accessToken).toBe('access-token');
            expect(result.tokens.refreshToken).toBe('refresh-token');
        });

        it('should throw ConflictException if email already exists', async () => {
            // Arrange
            prisma.user.findUnique.mockResolvedValue(mockUser);

            // Act & Assert
            await expect(service.register(registerDto)).rejects.toThrow(
                ConflictException,
            );
            await expect(service.register(registerDto)).rejects.toThrow(
                'Bu email adresi zaten kayıtlı',
            );
        });

        it('should hash the password before storing', async () => {
            // Arrange
            prisma.user.findUnique.mockResolvedValue(null);
            prisma.user.create.mockResolvedValue({
                id: 'new-user-id',
                email: registerDto.email,
                fullName: registerDto.fullName,
                role: 'USER',
            });
            prisma.refreshToken.create.mockResolvedValue({});
            mockJwtService.signAsync.mockResolvedValue('token');

            // Act
            await service.register(registerDto);

            // Assert
            expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 12);
        });

        it('should convert email to lowercase', async () => {
            // Arrange
            const upperCaseEmailDto = {
                ...registerDto,
                email: 'TEST@EXAMPLE.COM',
            };
            prisma.user.findUnique.mockResolvedValue(null);
            prisma.user.create.mockResolvedValue({
                id: 'new-user-id',
                email: 'test@example.com',
                fullName: registerDto.fullName,
                role: 'USER',
            });
            prisma.refreshToken.create.mockResolvedValue({});
            mockJwtService.signAsync.mockResolvedValue('token');

            // Act
            await service.register(upperCaseEmailDto);

            // Assert
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { email: 'test@example.com' },
            });
        });
    });

    // ===========================================
    // LOGIN Tests
    // ===========================================
    describe('login', () => {
        const loginDto: LoginDto = {
            email: 'test@example.com',
            password: 'correctpassword',
        };

        it('should successfully login with valid credentials', async () => {
            // Arrange
            prisma.user.findUnique.mockResolvedValue(mockUser);
            prisma.refreshToken.create.mockResolvedValue({});
            mockJwtService.signAsync
                .mockResolvedValueOnce('access-token')
                .mockResolvedValueOnce('refresh-token');

            // Act
            const result = await service.login(loginDto);

            // Assert
            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('tokens');
            expect(result.user.email).toBe(mockUser.email);
        });

        it('should throw UnauthorizedException for non-existent user', async () => {
            // Arrange
            prisma.user.findUnique.mockResolvedValue(null);

            // Act & Assert
            await expect(service.login(loginDto)).rejects.toThrow(
                UnauthorizedException,
            );
            await expect(service.login(loginDto)).rejects.toThrow(
                'Email veya şifre hatalı',
            );
        });

        it('should throw UnauthorizedException for inactive user', async () => {
            // Arrange
            prisma.user.findUnique.mockResolvedValue({
                ...mockUser,
                isActive: false,
            });

            // Act & Assert
            await expect(service.login(loginDto)).rejects.toThrow(
                UnauthorizedException,
            );
            await expect(service.login(loginDto)).rejects.toThrow(
                'Hesabınız devre dışı bırakılmış',
            );
        });

        it('should throw UnauthorizedException for wrong password', async () => {
            // Arrange
            prisma.user.findUnique.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            // Act & Assert
            await expect(service.login(loginDto)).rejects.toThrow(
                UnauthorizedException,
            );
        });

        it('should not reveal whether email exists (security)', async () => {
            // Both wrong email and wrong password should return same error
            prisma.user.findUnique.mockResolvedValue(null);

            await expect(service.login(loginDto)).rejects.toThrow(
                'Email veya şifre hatalı',
            );
        });
    });

    // ===========================================
    // LOGOUT Tests
    // ===========================================
    describe('logout', () => {
        it('should successfully logout and delete refresh token', async () => {
            // Arrange
            prisma.refreshToken.delete.mockResolvedValue({});

            // Act
            const result = await service.logout('valid-refresh-token');

            // Assert
            expect(result).toHaveProperty('message');
            expect(result.message).toBe('Başarıyla çıkış yapıldı');
            expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
                where: { token: 'valid-refresh-token' },
            });
        });

        it('should not throw error if token does not exist', async () => {
            // Arrange
            prisma.refreshToken.delete.mockRejectedValue(new Error('Not found'));

            // Act & Assert (should not throw)
            const result = await service.logout('non-existent-token');
            expect(result.message).toBe('Başarıyla çıkış yapıldı');
        });
    });

    // ===========================================
    // LOGOUT ALL Tests
    // ===========================================
    describe('logoutAll', () => {
        it('should delete all refresh tokens for a user', async () => {
            // Arrange
            prisma.refreshToken.deleteMany.mockResolvedValue({ count: 3 });

            // Act
            const result = await service.logoutAll('test-user-id');

            // Assert
            expect(result.message).toBe('Tüm cihazlardan çıkış yapıldı');
            expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
                where: { userId: 'test-user-id' },
            });
        });
    });
});
