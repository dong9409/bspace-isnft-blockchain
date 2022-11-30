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
exports.AuthController = void 0;
const signin_user_dto_1 = require("./dto/signin-user.dto");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUpUser(res, userInfo) {
        try {
            const result = await this.authService.signUpUser(userInfo);
            console.log(`'result=========='`, result);
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
    async signInUser(res, userInfo) {
        try {
            const result = await this.authService.signInUser(userInfo);
            console.log(`'result=========='`, result);
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
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, signup_user_dto_1.SignUpUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUpUser", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, signin_user_dto_1.SignInUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInUser", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map