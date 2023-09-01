/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Request, Response } from 'express';
import prisma from '../../../shared/prisma';
import * as orderService from './order-service';

interface CustomRequest extends Request {
  decodedToken?: {
    userId: string;
    role: string;
  };
}

export async function createOrder(req: Request, res: Response) {
  try {
    const { userId } = req.decodedToken;
    const { orderedBooks } = req.body;

    const order = await orderService.createOrder(userId, orderedBooks);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
}



export async function getAllOrders(req: CustomRequest, res: Response) {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error retrieving orders' });
  }
}

export async function getOrdersForUser(req: CustomRequest, res: Response) {
  try {
    const userId = req?.decodedToken?.userId;
    if (!userId) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const orders = await orderService.getOrdersForUser(userId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error retrieving user orders' });
  }
}

export async function getOrderById(req: CustomRequest, res: Response) {
  try {
    const { userId, role } = req?.decodedToken || {}; // Use optional
    const orderId = req.params.orderId;

    if (role === 'admin') {
      const order = await orderService.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
      } else {
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Order fetched successfully',
          data: order,
        });
      }
    } else if (userId) {
      const order = await orderService.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
      } else if (order.userId !== userId) {
        res.status(403).json({ success: false, message: 'Access denied' });
      } else {
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Order fetched successfully',
          data: order,
        });
      }
    } else {
      res.status(403).json({ success: false, message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
}

export async function getUserProfile(req: CustomRequest, res: Response) {
  try {
    const userId = req?.decodedToken?.userId;
    if (!userId) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const user = await orderService.getUserProfile(userId);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
    } else {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User profile retrieved successfully',
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error retrieving user profile' });
  }
}
