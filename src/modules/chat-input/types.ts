export namespace IEntity {
  export interface ChatInput {
    chatInput: string;
  }

  export interface Message {
    user_id: number;
    message: string;
  }
  export interface AllMessage {
    list: Message[];
  }
}
