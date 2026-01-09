"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterDto {
    fullName;
    email;
    password;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ahmet Yılmaz', description: 'User full name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ad soyad zorunludur' }),
    (0, class_validator_1.MinLength)(2, { message: 'Ad soyad en az 2 karakter olmalıdır' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Ad soyad en fazla 100 karakter olabilir' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmet@example.com', description: 'User email address' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Geçerli bir email adresi giriniz' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email zorunludur' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SecurePass123!', description: 'User password (min 8 chars)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Şifre zorunludur' }),
    (0, class_validator_1.MinLength)(8, { message: 'Şifre en az 8 karakter olmalıdır' }),
    (0, class_validator_1.MaxLength)(128, { message: 'Şifre en fazla 128 karakter olabilir' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
//# sourceMappingURL=register.dto.js.map