"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./app/modules/auth/auth-route");
const books_route_1 = require("./app/modules/books/books-route");
const category_route_1 = require("./app/modules/categories/category-route");
const customer_route_1 = require("./app/modules/customer/customer-route");
const order_route_1 = require("./app/modules/orders/order-route");
const profile_route_1 = require("./app/modules/profiles/profile-route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', customer_route_1.customerRoutes);
app.use('/api/v1', books_route_1.booksRoutes);
app.use('/api/v1', category_route_1.categoryRoutes);
app.use('/api/v1', order_route_1.OrderRoutes);
app.use('/api/v1', auth_route_1.authRoutes);
app.use('/api/v1', profile_route_1.profileRoutes);
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
