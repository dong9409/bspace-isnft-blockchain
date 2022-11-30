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
exports.UserController = void 0;
const jwt_gaurd_1 = require("./../auth/guard/jwt.gaurd");
const update_user_dto_1 = require("./dto/update-user.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(res, userInfo) {
        try {
            const result = await this.userService.createUser(userInfo);
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
    async getUserList(res) {
        try {
            const result = await this.userService.getUserList();
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
    async getUserDetail(res, user_id) {
        try {
            const result = await this.userService.getUserDetail(user_id);
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
    async updateUser(res, userInfo) {
        try {
            const result = await this.userService.updateUser(userInfo);
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
    async deleteUser(res, user_id) {
        try {
            const result = await this.userService.deleteUser(user_id);
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
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, common_1.Get)('/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDetail", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.UseGuards)(jwt_gaurd_1.JwtGaurd),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map