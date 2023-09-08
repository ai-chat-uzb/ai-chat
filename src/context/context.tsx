import React, { createContext, ReactNode, useState } from 'react';

import { ContextTypes, Message } from './context.t';

export const CreateContext = createContext<ContextTypes | undefined>(undefined);

const Context = ({ children }: { children: ReactNode }) => {
  const [messageHistory, setMessageHistory] = useState<Message[] | []>([]);

  return <CreateContext.Provider value={{ messageHistory, setMessageHistory }}>{children}</CreateContext.Provider>;
};

export default Context;
