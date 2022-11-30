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
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const jimp = require("jimp");
const axios_1 = require("axios");
let VerificationService = class VerificationService {
    constructor() { }
    async verify(f) {
        try {
            const { file, verify } = f;
            const { content_url } = verify;
            const img1 = file.buffer;
            const bufferFromUrl = await axios_1.default.get(content_url, {
                responseType: 'arraybuffer',
            });
            const img2 = Buffer.from(bufferFromUrl.data, 'utf-8');
            const vImg1 = await jimp.read(img1);
            const vImg2 = await jimp.read(img2);
            const distance = jimp.distance(vImg1, vImg2);
            const diff = jimp.diff(vImg1, vImg2).percent;
            console.log(distance);
            console.log(diff);
            return {
                verify: distance === 0 || diff < 0.2 ? true : false,
                distance: distance,
                diff: diff,
            };
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
};
VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], VerificationService);
exports.VerificationService = VerificationService;
//# sourceMappingURL=verification.service.js.map