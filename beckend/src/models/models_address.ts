import { Schema } from 'mongoose';

export interface IAddress {
  city: string;
  street: string;
  building: string;
  apartment: string;
}

export const AddressSchema = new Schema<IAddress>({
  city: { type: String, required: true },
  street: { type: String, required: true },
  building: { type: String, required: true },
  apartment: { type: String, required: true }
}, { _id: false });