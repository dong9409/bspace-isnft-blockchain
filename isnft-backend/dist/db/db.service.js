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
exports.DbService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let DbService = class DbService {
    constructor(config) {
        this.config = config;
    }
    createTypeOrmOptions() {
        return {
            type: 'mysql',
            host: this.config.get('DATABASE_HOST'),
            username: this.config.get('DATABASE_USER'),
            password: this.config.get('DATABASE_PASSWORD'),
            port: this.config.get('DATABASE_PORT'),
            database: this.config.get('DATABASE_NAME'),
            entities: [this.config.get('ENTITY_PATH')],
        };
    }
};
DbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DbService);
exports.DbService = DbService;
//# sourceMappingURL=db.service.js.map