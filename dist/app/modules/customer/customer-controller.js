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
exports.deleteUserById = exports.updateUserById = exports.getSingleUserById = exports.getUsers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const customer_service_1 = require("./customer-service");
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, customer_service_1.getAllUsers)();
            res.status(http_status_1.default.OK).json({
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Users retrieved successfully',
                data: users,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUsers = getUsers;
function getSingleUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, customer_service_1.getSingleUser)(id);
            if (!user) {
                res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                });
            }
            else {
                res.status(http_status_1.default.OK).json({
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'User fetched successfully',
                    data: user,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getSingleUserById = getSingleUserById;
function updateUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const payload = req.body;
            const user = yield (0, customer_service_1.updateUser)(id, payload);
            if (!user) {
                res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                });
            }
            else {
                res.status(http_status_1.default.OK).json({
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'User updated successfully',
                    data: user,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateUserById = updateUserById;
function deleteUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, customer_service_1.deleteUser)(id);
            if (!user) {
                res.status(http_status_1.default.NOT_FOUND).json({
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: 'User not found',
                    data: null,
                });
            }
            else {
                res.status(http_status_1.default.OK).json({
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'User deleted successfully',
                    data: user,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteUserById = deleteUserById;
