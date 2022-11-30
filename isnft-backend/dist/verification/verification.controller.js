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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationController = void 0;
const verification_service_1 = require("./verification.service");
const verify_dto_1 = require("./dto/verify.dto");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
let VerificationController = class VerificationController {
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    async verify(res, file, verify) {
        try {
            const result = await this.verificationService.verify({
                file,
                verify,
            });
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                message: 'success',
                data: result,
            });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: e.message,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, verify_dto_1.VerifyDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "verify", null);
VerificationController = __decorate([
    (0, common_1.Controller)('verification'),
    __metadata("design:paramtypes", [verification_service_1.VerificationService])
], VerificationController);
exports.VerificationController = VerificationController;
//# sourceMappingURL=verification.controller.js.map