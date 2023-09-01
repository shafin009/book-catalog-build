/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import mongoose, { Document, Model, Schema } from 'mongoose';
import config from '../../../config/index';

export interface Admin extends Document {
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const adminSchema: Schema<Admin> = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin'], required: true },
  password: { type: String, required: true, select: false },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

adminSchema.pre<Admin>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const admin = this;
  const hashedPassword = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_rounds)
  );
  admin.password = hashedPassword;
  return next();
});

const AdminModel: Model<Admin> = mongoose.model<Admin>('Admin', adminSchema);

export default AdminModel;
