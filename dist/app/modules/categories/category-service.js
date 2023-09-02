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
exports.deleteCategory = exports.updateCategory = exports.getSingleCategory = exports.getAllCategories = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createCategory(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma.category.create({
            data: {
                title,
            },
        });
        return category;
    });
}
exports.createCategory = createCategory;
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield prisma.category.findMany();
        return categories;
    });
}
exports.getAllCategories = getAllCategories;
function getSingleCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma.category.findUnique({
            where: {
                id,
            },
            include: {
                books: true,
            },
        });
        return category;
    });
}
exports.getSingleCategory = getSingleCategory;
function updateCategory(id, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma.category.update({
            where: {
                id,
            },
            data: {
                title,
            },
        });
        return category;
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield prisma.category.delete({
            where: {
                id,
            },
        });
        return category;
    });
}
exports.deleteCategory = deleteCategory;
