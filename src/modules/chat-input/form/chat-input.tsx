import React, { FC, ReactNode, useEffect } from 'react';
import { toast } from 'ai-ui-kit/lib/components';
import useMessageContext from 'context/hooks/use-message-context';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import useWebSocket from 'react-use-websocket';

import { useAuth } from 'hooks';
import useQueryParams from 'hooks/use-query-params/use-query-params';

import { Mappers, Types } from '..';

type NewType = (data: Types.IEntity.ChatInput) => void;

interface ChatInputProps {
  onSuccess?: NewType;
  children: (date: UseFormReturn<Types.IEntity.ChatInput>) => ReactNode;
  defaultValues?: Types.IEntity.ChatInput;
}

const ChatInput: FC<ChatInputProps> = ({ children, defaultValues }) => {
  const { user } = useAuth();
  const [query] = useQueryParams();
  const { messageHistory, setMessageHistory } = useMessageContext();
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(`wss://www.2wo1ne.uz/ws/chat/${query?.roomId}/`, {
    onOpen: () => '',
    shouldReconnect: () => !!query.roomId
  });

  const data = useForm<Types.IEntity.ChatInput>({ defaultValues });

  const onSubmit: SubmitHandler<Types.IEntity.ChatInput> = ({ chatInput }) => {
    if (query.roomId) {
      sendJsonMessage({ user_id: user.id, message: chatInput });
      data.reset();
    } else {
      toast.error({ content: 'Please select the person to whom the message will be sent first.' });
    }
  };

  // useEffect(() => {
  //   setMessageHistory([]);
  // }, [query?.roomId]);

  useEffect(() => {}, [query?.page]);

  useEffect(() => {
    if (lastJsonMessage) {
      // @ts-ignore
      const message = Mappers.lastMessage(lastJsonMessage);

      // @ts-ignore
      setMessageHistory([...messageHistory, message]);
    }
  }, [lastJsonMessage]);

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default ChatInput;
