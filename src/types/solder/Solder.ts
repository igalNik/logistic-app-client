export interface Solder {
  _id: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  department: {
    name: string;
    id: string;
  };
  fullName: string;
}
