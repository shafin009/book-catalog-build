import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';


import cookieParser from 'cookie-parser';
import { authRoutes } from './app/modules/auth/auth-route';
import { booksRoutes } from './app/modules/books/books-route';
import { categoryRoutes } from './app/modules/categories/category-route';
import { customerRoutes } from './app/modules/customer/customer-route';


const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', customerRoutes);
app.use('/api/v1', booksRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', authRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
