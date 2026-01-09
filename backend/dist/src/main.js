"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('CalenFit API')
        .setDescription('CalenFit Backend API - Personal Trainer Reservation System')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Authentication', 'User authentication endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT') || 3001;
    await app.listen(port);
    console.log(`
🚀 CalenFit Backend is running!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 API:      http://localhost:${port}/api
📚 Swagger:  http://localhost:${port}/api/docs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}
bootstrap();
//# sourceMappingURL=main.js.map