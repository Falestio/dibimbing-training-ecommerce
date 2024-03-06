"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterProductCategoryForeignKey1709609537849 = void 0;
class AlterProductCategoryForeignKey1709609537849 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "product"
            DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812",
            ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812"
            FOREIGN KEY ("categoryId") REFERENCES "category"("id")
            ON DELETE SET NULL
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "product"
            DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812",
            ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812"
            FOREIGN KEY ("categoryId") REFERENCES "category"("id")
        `);
        });
    }
}
exports.AlterProductCategoryForeignKey1709609537849 = AlterProductCategoryForeignKey1709609537849;
//# sourceMappingURL=1709609537849-AlterProductCategoryForeignKey.js.map