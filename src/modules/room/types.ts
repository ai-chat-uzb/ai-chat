export namespace IEntity {
  export interface IRoom {
    roomId: string;
  }
}

export namespace IQuery {
  export interface IQueryRequest {
    id: number;
  }
}

export namespace IApi {
  export interface Request {
    id: number;
  }
  export interface Response {
    room_name: string;
  }
}
