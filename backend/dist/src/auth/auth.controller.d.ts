import { AuthService, AuthResponse, AuthTokens } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    refreshTokens(dto: RefreshTokenDto): Promise<AuthTokens>;
    logout(dto: RefreshTokenDto): Promise<{
        message: string;
    }>;
    logoutAll(userId: string): Promise<{
        message: string;
    }>;
    getMe(user: any): Promise<{
        user: any;
    }>;
}
