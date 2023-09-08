import React, { FC, ReactNode, useEffect } from 'react';
import useMessageContext from 'context/hooks/use-message-context';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import useWebSocket from 'react-use-websocket';

import { useAuth } from 'hooks';
import useQueryParams from 'hooks/use-query-params/use-query-params';

import { Types } from '..';

type NewType = (data: Types.IEntity.ChatInput) => void;

interface ChatInputProps {
  onSuccess?: NewType;
  children: (date: UseFormReturn<Types.IEntity.ChatInput>) => ReactNode;
  defaultValues?: Types.IEntity.ChatInput;
}

const ChatInput: FC<ChatInputProps> = ({ onSuccess, children, defaultValues }) => {
  const { user } = useAuth();
  const [query] = useQueryParams();
  const { messageHistory, setMessageHistory } = useMessageContext();
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(`wss://www.2wo1ne.uz/ws/chat/${query?.roomName}/`, {
    onOpen: () => console.log('opened'),
    shouldReconnect: () => !!query.roomName
  });

  const data = useForm<Types.IEntity.ChatInput>({ defaultValues });

  const onSubmit: SubmitHandler<Types.IEntity.ChatInput> = ({ chatInput }) => {
    sendJsonMessage({ user_id: user.id, message: chatInput });
    data.reset();
  };

  useEffect(() => {
    if (lastJsonMessage) {
      // @ts-ignore
      setMessageHistory([...messageHistory, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default ChatInput;
