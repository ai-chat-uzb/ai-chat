export interface SearchProps {
  search: string;
}

export namespace IEntity {
  export interface ISearchListItem {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    username: string;
    lastLogin: string;
  }
  export interface ISearchList {
    users: ISearchListItem[];
  }
}

export namespace IQuery {
  export interface IQueryRequest {
    keyword: string;
  }
  export interface IQueryResponse extends IEntity.ISearchList {}

  export interface IUseQueryResponse extends IEntity.ISearchList {
    isLoading: boolean;
  }
}

export namespace IApi {
  export interface ISearchRequest extends IQuery.IQueryRequest {}
  export interface ISearchResponse {
    users: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      photo_url: string;
      username: string;
      last_login: string;
    }[];
  }
}
