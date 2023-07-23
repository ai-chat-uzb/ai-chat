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
  }
}
