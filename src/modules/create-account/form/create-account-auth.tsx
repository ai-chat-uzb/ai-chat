import { FC, ReactNode } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { IForm } from '../type';

import { createAccountSchema } from './schema';

interface CreateAccountAuthProps {
  onSuccess?: (data: IForm.ICreateAccount) => void;
  children: (data: UseFormReturn<IForm.ICreateAccount>) => ReactNode;
  defaultValues?: IForm.ICreateAccount;
}

export const CreateAccountAuth: FC<CreateAccountAuthProps> = ({ children, defaultValues = {} }) => {
  const data = useForm<IForm.ICreateAccount>({ resolver: yupResolver(createAccountSchema), defaultValues });

  const onSubmit: SubmitHandler<IForm.ICreateAccount> = e => {
    console.log(e);
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};
