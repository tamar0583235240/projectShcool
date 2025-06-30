import { Schema, model, Document } from 'mongoose';
import { IAddress, AddressSchema } from './models_address';

export interface IStudent extends Document {
  id: string;
  name: string;
  age: number;
  phone: string;
  grade: string;
  address: IAddress;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 5, max: 18 },
  phone: { type: String, required: true },
  grade: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  password: { type: String, required: true, minlength: 6 }
}, {
  timestamps: true
});

// Index for better query performance
StudentSchema.index({ id: 1 });
StudentSchema.index({ grade: 1 });
StudentSchema.index({ name: 1 });

export const Student = model<IStudent>('Student', StudentSchema);