export namespace IEntity {
  export interface ChatInput {
    chatInput: string;
  }

  export interface Message {
    userId: number;
    message: string;
  }
  export interface AllMessage {
    list: Message[];
  }
}

export namespace IChat {
  export interface Message {
    user_id: number;
    message: string;
  }
  export interface Request extends Message {}

  export interface Response extends Message {}
}
