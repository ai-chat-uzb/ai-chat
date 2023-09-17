import { Types } from 'modules/create-account';

export namespace IEntity {
  export interface IUser {
    id: number;
    text: string;
    timeCreated: string;
    contact: Omit<Types.IEntity.IUser, 'password'> & { lastLogin: string };
  }

  export type IUserList = IUser[];
}

export namespace IQuery {
  export interface Request {}
  export interface Response extends IEntity.IUserList {}
}

export namespace IApi {
  export interface Request {}

  export interface IUserResponse {
    id: number;
    text: string;
    time_created: string;
    contact: {
      id: number;
      email: string;
      last_login: string;
      first_name: string;
      last_name: string;
      photo_url: string;
      icon_id: string;
      username: string;
    };
  }

  export interface Response {
    map(history: (item: IUserResponse) => IEntity.IUser): IEntity.IUserList;
    items: IUserResponse[];
  }
}
