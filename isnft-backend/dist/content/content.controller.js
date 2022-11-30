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
exports.ContentController = void 0;
const jwt_gaurd_1 = require("./../auth/guard/jwt.gaurd");
const update_content_dto_1 = require("./dto/update-content.dto");
const create_content_dto_1 = require("./dto/create-content.dto");
const content_service_1 = require("./content.service");
const common_1 = require("@nestjs/common");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    async createContent(res, contentInfo) {
        try {
            const result = await this.contentService.createContent(contentInfo);
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
    async getContentList(res) {
        try {
            const result = await this.contentService.getContentList();
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
    async getContentByUser(res, user_id) {
        try {
            const result = await this.contentService.getContentByUser(user_id);
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
    async getContentById(res, content_id) {
        try {
            const result = await this.contentService.getContentById(content_id);
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
    async updateContent(res, contentInfo) {
        try {
            const result = await this.contentService.updateContent(contentInfo);
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
    async mintContent(res, content_id) {
        try {
            const result = await this.contentService.mintContent(content_id);
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
    async deleteContent(res, content_id) {
        try {
            const result = await this.contentService.deleteContent(content_id);
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
    __metadata("design:paramtypes", [Object, create_content_dto_1.CreateContentDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createContent", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContentList", null);
__decorate([
    (0, common_1.Get)('/user/:user_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContentByUser", null);
__decorate([
    (0, common_1.Get)(':content_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('content_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContentById", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_content_dto_1.UpdateContentDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateContent", null);
__decorate([
    (0, common_1.Put)(':content_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('content_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "mintContent", null);
__decorate([
    (0, common_1.Delete)(':content_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('content_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteContent", null);
ContentController = __decorate([
    (0, common_1.UseGuards)(jwt_gaurd_1.JwtGaurd),
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
exports.ContentController = ContentController;
//# sourceMappingURL=content.controller.js.map