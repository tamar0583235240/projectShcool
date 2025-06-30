import { Schema, model, Document } from 'mongoose';
import { IAddress, AddressSchema } from './models_address';

export interface ITeacher extends Document {
  id: number;
  tz: string;
  firstName: string;
  lastName: string;
  class: string;
  phone: string;
  address: IAddress;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema = new Schema<ITeacher>({
  id: { type: Number, required: true, unique: true },
  tz: { type: String, required: true, unique: true, length: 9 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  class: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  password: { type: String, required: true, minlength: 6 }
}, {
  timestamps: true
});

// Index for better query performance
TeacherSchema.index({ id: 1 });
TeacherSchema.index({ tz: 1 });
TeacherSchema.index({ class: 1 });
TeacherSchema.index({ firstName: 1, lastName: 1 });

export const Teacher = model<ITeacher>('Teacher', TeacherSchema);