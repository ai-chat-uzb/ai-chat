import { FC, ReactNode } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from 'store/slice';

import { IForm } from '../type';

import { createAccountSchema } from './schema';

interface CreateAccountAuthProps {
  onSuccess?: (data: IForm.ICreateAccount) => void;
  children: (data: UseFormReturn<IForm.ICreateAccount>) => ReactNode;
  defaultValues?: IForm.ICreateAccount;
}

const CreateAccountAuth: FC<CreateAccountAuthProps> = ({ children, defaultValues = {} }) => {
  const data = useForm<IForm.ICreateAccount>({ resolver: yupResolver(createAccountSchema), defaultValues });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IForm.ICreateAccount> = e => {
    dispatch(
      loginUser({
        user: {
          firstName: e.firstName,
          email: e.email,
          accessToken: '4aa6a0445da16849aec6757b0232f25c9e0fbfbb25a0d54a209be1b4a92c42e7af2f156050b92b0efaa1c'
        }
      })
    );
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default CreateAccountAuth;
