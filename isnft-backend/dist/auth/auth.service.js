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
exports.AuthService = void 0;
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./../entity/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwt, config, userRepository) {
        this.jwt = jwt;
        this.config = config;
        this.userRepository = userRepository;
    }
    async signUpUser(userInfo) {
        try {
            const { user_id, user_pw, user_type } = userInfo;
            const check = await this.userRepository.findOne({ where: { user_id } });
            if (check) {
                throw new Error('이미 가입된 회원입니다.');
            }
            let _result;
            if (user_type === user_entity_1.USER_TPYE.EMAIL) {
                const hash = await argon.hash(user_pw);
                _result = this.userRepository.create(Object.assign(Object.assign({}, userInfo), { user_pw: hash }));
            }
            else {
                _result = this.userRepository.create({
                    user_id: user_id,
                    user_type: user_type,
                    user_nm: user_id,
                });
            }
            const result = await this.userRepository.save(_result);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    async signInUser(userInfo) {
        try {
            const { user_id, user_pw, user_type } = userInfo;
            const user = await this.userRepository.findOneOrFail({
                where: { user_id },
            });
            if (user_type === user_entity_1.USER_TPYE.EMAIL) {
                const pwMatches = await argon.verify(user.user_pw, user_pw);
                if (!pwMatches) {
                    throw new common_1.ForbiddenException('회원정보가 일치하지 않습니다.');
                }
            }
            delete user.user_pw;
            const access_token = await this.generateToken(user.user_id, 'ADMIN');
            const login_data = Object.assign(Object.assign({}, user), access_token);
            return login_data;
        }
        catch (e) {
            throw e;
        }
    }
    async generateToken(id, type = 'ADMIN') {
        const payload = {
            id: id,
            type: type,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '24h',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }
    async verify(authorization) {
        try {
            const token = authorization.replace('Bearer ', '');
            const result = this.jwt.decode(token);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map