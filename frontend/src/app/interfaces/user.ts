export interface User {
  _id?: string;
  image?: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  isAdult: boolean;
  address: string;
  preferences?: {
    type?: string;
    size?: string;
    age?: string;
  };
}