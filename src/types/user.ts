export interface UserType{
    name:string|undefined;
    email:string;
    password:string
}

export interface LoginUserType {
  user: UserType;
  accessToken: string;
  refreshToken: string;
}