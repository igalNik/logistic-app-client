export interface User {
  _id: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  appRole: string;
  department: {
    name: string;
    id: string;
  };
  fullName: string;
}
