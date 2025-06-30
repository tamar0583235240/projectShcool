export interface Student {
  _id: string;
  id: string;
  name: string;
  age: number;
  phone: string;
  grade: string;
  address: any; // אפשר להגדיר מבנה מלא אם צריך
  password?: string;
  __v?: number;
  createdAt: string;
  updatedAt: string;
}