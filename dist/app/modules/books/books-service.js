"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
exports.getAllBook = exports.getBooksByCategoryId = exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.createBook = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_interface_1 = require("./book-interface");
const prisma = new client_1.PrismaClient();
function createBook(bookData) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield prisma.book.create({
            data: bookData,
            include: {
                category: true,
            },
        });
        return book;
    });
}
exports.createBook = createBook;
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield prisma.book.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }
    catch (error) {
        throw new Error('Error fetching book');
    }
});
exports.getSingleBook = getSingleBook;
const updateBook = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield prisma.book.update({
            where: {
                id,
            },
            data: bookData,
        });
        return updatedBook;
    }
    catch (error) {
        throw new Error('Error updating book');
    }
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield prisma.book.delete({
            where: {
                id,
            },
        });
        return deletedBook;
    }
    catch (error) {
        throw new Error('Error deleting book');
    }
});
exports.deleteBook = deleteBook;
const getBooksByCategoryId = (id, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma.book.findMany({
        where: {
            categoryId: id,
        },
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : { createdAt: 'desc' },
        include: {
            category: true,
        },
    });
    const total = yield prisma.book.count({
        where: {
            categoryId: id,
        },
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: result,
    };
});
exports.getBooksByCategoryId = getBooksByCategoryId;
const getAllBook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { search, category, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["search", "category", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_interface_1.BookSearchField.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    const minPriceFloat = parseFloat(minPrice);
    const maxPriceFloat = parseFloat(maxPrice);
    if (!isNaN(minPriceFloat)) {
        andConditions.push({
            price: {
                gte: minPriceFloat,
            },
        });
    }
    if (!isNaN(maxPriceFloat)) {
        andConditions.push({
            price: {
                lte: maxPriceFloat,
            },
        });
    }
    if (category !== undefined) {
        andConditions.push({
            categoryId: {
                equals: category,
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.book.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : { createdAt: 'desc' },
    });
    const total = yield prisma.book.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: result,
    };
});
exports.getAllBook = getAllBook;
