import { Dispatch, SetStateAction } from 'react';
import { Types } from 'modules/chat-input';

export interface ContextTypes {
  messageHistory: Types.IEntity.Message[] | [];
  setMessageHistory: Dispatch<SetStateAction<Types.IEntity.Message[] | []>>;
}
