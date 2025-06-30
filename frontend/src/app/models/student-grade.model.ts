export interface Grade {
  _id: string;
  studentId: string;
  subject: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentGrade {
  studentId: string;
  grades: Grade[];
  average: number;
  totalSubjects: number;
}