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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const content_entity_1 = require("./../entity/content.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ContentService = class ContentService {
    constructor(contentRepository) {
        this.contentRepository = contentRepository;
    }
    async createContent(contentInfo) {
        try {
            const result = await this.contentRepository.save(contentInfo);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async getContentList() {
        try {
            const result = await this.contentRepository.find();
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async getContentByUser(user_id) {
        try {
            const result = await this.contentRepository.find({ where: { user_id } });
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async getContentById(content_id) {
        try {
            const result = await this.contentRepository.findOneOrFail({
                order: { created_at: { direction: 'DESC' } },
                where: { content_id },
            });
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async updateContent(contentInfo) {
        try {
            const { content_id } = contentInfo, updateInfo = __rest(contentInfo, ["content_id"]);
            await this.contentRepository.findOneOrFail({ where: { content_id } });
            const result = await this.contentRepository.update({ content_id }, updateInfo);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async mintContent(content_id) {
        try {
            await this.contentRepository.findOneOrFail({ where: { content_id } });
            const result = await this.contentRepository.update({ content_id }, { isNFT: true });
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteContent(content_id) {
        try {
            await this.contentRepository.findOneOrFail({ where: { content_id } });
            const result = await this.contentRepository.delete(content_id);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
};
ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_entity_1.Content)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContentService);
exports.ContentService = ContentService;
//# sourceMappingURL=content.service.js.map