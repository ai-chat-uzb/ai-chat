import React, { FC, ReactNode } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { Types } from '..';

type NewType = (data: Types.IEntity.ChatInput) => void;

interface ChatInputProps {
  onSuccess?: NewType;
  children: (date: UseFormReturn<Types.IEntity.ChatInput>) => ReactNode;
  defaultValues?: Types.IEntity.ChatInput;
}

const ChatInput: FC<ChatInputProps> = ({ onSuccess, children, defaultValues }) => {
  const data = useForm<Types.IEntity.ChatInput>({ defaultValues });

  const onSubmit: SubmitHandler<Types.IEntity.ChatInput> = ({ chatInput }) => {
    console.log(chatInput);
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default ChatInput;
