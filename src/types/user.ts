export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginUserType {
  _id: string;
  user: UserType;
  accessToken: string;
  refreshToken: string;
}