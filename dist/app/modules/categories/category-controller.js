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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.getSingleCategoryController = exports.getAllCategoriesController = exports.createCategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const category_service_1 = require("./category-service");
function createCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title } = req.body;
            const category = yield (0, category_service_1.createCategory)(title);
            res.status(http_status_1.default.OK).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Category created successfully',
                data: category,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createCategoryController = createCategoryController;
function getAllCategoriesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield (0, category_service_1.getAllCategories)();
            res.status(http_status_1.default.OK).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Categories fetched successfully',
                data: categories,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllCategoriesController = getAllCategoriesController;
function getSingleCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const category = yield (0, category_service_1.getSingleCategory)(id);
            if (!category) {
                res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: 'Category not found',
                    data: null,
                });
            }
            else {
                res.status(http_status_1.default.OK).json({
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'Category fetched successfully',
                    data: category,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getSingleCategoryController = getSingleCategoryController;
function updateCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const category = yield (0, category_service_1.updateCategory)(id, title);
            if (!category) {
                res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: 'Category not found',
                    data: null,
                });
            }
            else {
                res.status(http_status_1.default.OK).json({
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'Category updated successfully',
                    data: category,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateCategoryController = updateCategoryController;
function deleteCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const category = yield (0, category_service_1.deleteCategory)(id);
            if (!category) {
                res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: 'Category not found',
                    data: null,
                });
            }
            else {
                res.status(http_status_1.default.OK).json({
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'Category deleted successfully',
                    data: category,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteCategoryController = deleteCategoryController;
