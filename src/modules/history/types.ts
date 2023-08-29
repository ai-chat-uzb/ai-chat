import { Types } from 'modules/create-account';

export namespace IEntity {
  export interface IHistory {
    id: number;
    text: string;
    timeCreated: string;
    ownerId: Omit<Types.IEntity.IUser, 'password'> & { lastLogin: string };
    sentId: Omit<Types.IEntity.IUser, 'password'> & { lastLogin: string };
  }

  export type IHistoryList = IHistory[];
}

export namespace IQuery {
  export interface Request {}
  export interface Response extends IEntity.IHistoryList {}
}

export namespace IApi {
  export interface Request {}

  export interface IHistoryResponse {
    id: number;
    text: string;
    time_created: string;
    owner_id: {
      id: number;
      email: string;
      last_login: string;
      first_name: string;
      last_name: string;
      photo_url: string;
      icon_id: string;
      username: string;
    };
    sent_id: {
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
    map(history: (item: IHistoryResponse) => IEntity.IHistory): IEntity.IHistoryList;
    items: IHistoryResponse[];
  }
}
