export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
