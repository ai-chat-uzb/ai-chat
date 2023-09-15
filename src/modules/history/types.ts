export namespace IEntity {
  export interface History {
    id: 33;
    userId: number;
    sentId: number;
    message: string;
    timeCreated: string;
  }
  export interface GeneralHistory {
    items: History[];
  }
  export interface PaginationKey {
    id: number;
  }
}

export namespace IApi {
  export interface Request {
    sent_id: number;
  }

  export interface Response {
    id: 33;
    owner_id: number;
    sent_id: number;
    message: string;
    time_created: string;
  }
}
