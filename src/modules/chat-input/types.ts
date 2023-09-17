export namespace IEntity {
  export interface ChatInput {
    chatInput: string;
  }

  export interface Message {
    userId: number;
    message: string;
    id?: 33;
    sentId?: number;
    text?: string;
    timeCreated?: string;
  }
  export interface AllMessage {
    list: Message[];
  }
  export interface PageNumber {
    page: number;
  }
}

export namespace IChat {
  export interface Message {
    user_id: number;
    message: string;
    time: string;
  }
  export interface Request extends Message {}

  export interface Response extends Message {}
}
