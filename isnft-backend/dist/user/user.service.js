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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entity_1 = require("../entity");
const typeorm_2 = require("typeorm");
const argon = require("argon2");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userInfo) {
        try {
            const { user_id, user_pw } = userInfo;
            const check = await this.userRepository.findOne({ where: { user_id } });
            if (check) {
                throw new Error('?????? ????????? ???????????????.');
            }
            const hash = await argon.hash(user_pw);
            const result = await this.userRepository.save(Object.assign(Object.assign({}, userInfo), { user_pw: hash }));
            delete result.user_pw;
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async getUserList() {
        try {
            const result = await this.userRepository.find();
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async getUserDetail(user_id) {
        try {
            const result = await this.userRepository.findOneOrFail({
                where: { user_id },
            });
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async updateUser(userInfo) {
        try {
            const { user_id } = userInfo, updateInfo = __rest(userInfo, ["user_id"]);
            await this.userRepository.findOneOrFail({ where: { user_id } });
            if (updateInfo.user_pw) {
                updateInfo.user_pw = await argon.hash(updateInfo.user_pw);
            }
            const result = await this.userRepository.update({ user_id }, updateInfo);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteUser(user_id) {
        try {
            await this.userRepository.findOneOrFail({ where: { user_id } });
            const result = await this.userRepository.delete(user_id);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map