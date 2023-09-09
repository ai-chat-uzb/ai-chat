import React, { FC } from 'react';
import useMessageContext from 'context/hooks/use-message-context';
import Lottie from 'lottie-react-component';

import emptyJson from 'assets/lottie/empty/empty.json';

import { UserContent } from './components';

import cls from './chat.module.scss';

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  const { messageHistory } = useMessageContext();

  return (
    <div className={cls.wrapper}>
      {messageHistory.length > 0 ? (
        <UserContent list={messageHistory} />
      ) : (
        <div className={cls.container}>
          <div className={cls.row}>
            <Lottie animationData={emptyJson} loop />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
