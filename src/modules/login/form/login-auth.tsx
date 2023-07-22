import { FC, ReactNode } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { IForm } from '../type';

import { loginSchema } from './schema';

interface LoginAuthProps {
  onSuccess?: (data: IForm.ILoginAuth) => void;
  children: (date: UseFormReturn<IForm.ILoginAuth>) => ReactNode;
  defaultValues?: IForm.ILoginAuth;
}

const LoginAuth: FC<LoginAuthProps> = ({ children, defaultValues, onSuccess }) => {
  const data = useForm<IForm.ILoginAuth>({ defaultValues, resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<IForm.ILoginAuth> = (e: any) => {
    console.log(e);
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default LoginAuth;
