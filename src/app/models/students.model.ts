export interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
  dateJoined: Date;
  address: string;
  gradesOverTime: Array<{ subject: string; grade: number; date: Date }>;
  city: string;
  country: string;
  zip: string;
  subject: string;
}
