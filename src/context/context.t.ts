import { Dispatch, SetStateAction } from 'react';

export type Message = { user_id: number; message: string };

export interface ContextTypes {
  messageHistory: Message[] | [];
  setMessageHistory: Dispatch<SetStateAction<Message[] | []>>;
}
