import { FC, useEffect, useRef } from 'react';
import { UserContent as BaseUserContent } from 'ai-ui-kit/lib/components';
import useMessageContext from 'context/hooks/use-message-context';
import { NORMAL_FORMAT } from 'helpers/constants';
import Lottie from 'lottie-react-component';
import { useHistory } from 'modules/history/hooks';
import moment from 'moment';

import { useAuth } from 'hooks';
import useQueryParams from 'hooks/use-query-params/use-query-params';

import emptyJson from 'assets/lottie/empty/empty.json';

import cls from './chat.module.scss';

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  const { user } = useAuth();
  const { messageHistory, setMessageHistory } = useMessageContext();
  const [query] = useQueryParams();

  const messagesEndRef = useRef<HTMLSpanElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'instant' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  const { mutate } = useHistory();

  useEffect(() => {
    setMessageHistory([]);
    if (query?.roomId) {
      mutate({ id: +query?.setId });
    }
  }, [query?.roomId]);
  useEffect(() => {}, [messageHistory]);

  return (
    <div className={cls.wrapper}>
      {messageHistory.length > 0 ? (
        <div id="scrollableDiv" className={cls['chat-container']}>
          {messageHistory.map((item, index) => (
            <BaseUserContent
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              // id={messageHistory.length === index - 1 && 'ContainerElementID'}
              userName={user.username}
              description={item.message}
              date={item.timeCreated ? moment(item.timeCreated).clone().format(NORMAL_FORMAT) : ''}
              status="active"
              url=""
              author={item.userId === user.id}
              chat="private"
              consecutively={index !== 0 && item.userId === messageHistory[index - 1].userId}
            />
          ))}
          <span ref={messagesEndRef} />
        </div>
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
