export namespace IForm {
  export type ICreateAccount = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetPassword: string;
    accessToken?: string;
  };

  export interface IUserReturn {
    first_name: string;
    email: string;
    last_name: string;
    username: string;
    id: number;
    photo_url: string;
  }
}

export namespace IEntity {
  export interface IUser {
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    username: string;
    email: string;
  }
}
