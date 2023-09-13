import React, { createContext, ReactNode, useState } from 'react';
import { Types } from 'modules/chat-input';

import { ContextTypes } from './context.t';

export const CreateContext = createContext<ContextTypes | undefined>(undefined);

const Context = ({ children }: { children: ReactNode }) => {
  const [messageHistory, setMessageHistory] = useState<Types.IEntity.Message[] | []>([]);
  const [count, setCount] = useState(0);
  const value = { messageHistory, setMessageHistory, count, setCount };

  return <CreateContext.Provider value={value}>{children}</CreateContext.Provider>;
};

export default Context;
