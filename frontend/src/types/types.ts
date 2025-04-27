export interface CreateUserType {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export type CurrentUserType = Omit<CreateUserType, 'password'> & {
  createdAt: string;
  updatedAt: string;
};
