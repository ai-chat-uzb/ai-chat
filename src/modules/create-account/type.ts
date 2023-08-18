export namespace IForm {
  export type ICreateAccount = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetPassword: string;
    accessToken?: string;
  };
  // back

  export interface IUser {
    firstName: string;
    email: string;
    avatarUrl: string;
    lastName: string;
    username: string;
    id: number;
    password: string;
  }
  export interface IUserReturn {
    first_name: string;
    email: string;
    last_name: string;
    username: string;
    id: number;
    photo_url: string;
  }
}
