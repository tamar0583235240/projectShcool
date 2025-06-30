import { Schema, model, Document } from 'mongoose';

export interface IGrade extends Document {
  studentId: string;
  subject: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const GradeSchema = new Schema<IGrade>({
  studentId: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 }
}, {
  timestamps: true
});

// Index for better query performance
GradeSchema.index({ studentId: 1 });
GradeSchema.index({ subject: 1 });
GradeSchema.index({ studentId: 1, subject: 1 });

export const Grade = model<IGrade>('Grade', GradeSchema);