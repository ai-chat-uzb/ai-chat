import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import axios from 'axios';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { useAuth } from '../hook';
import { IForm } from '../type';

import { createAccountSchema } from './schema';

interface CreateAccountAuthProps {
  onSuccess: Dispatch<SetStateAction<boolean>>;
  children: (data: UseFormReturn<IForm.ICreateAccount>) => ReactNode;
  defaultValues?: IForm.ICreateAccount;
}

const CreateAccountAuth: FC<CreateAccountAuthProps> = ({ children, defaultValues = {}, onSuccess }) => {
  const data = useForm<IForm.ICreateAccount>({ resolver: yupResolver(createAccountSchema), defaultValues });
  const { login } = useAuth();

  const onSubmit: SubmitHandler<IForm.ICreateAccount> = e => {
    const res = async () => {
      try {
        const user = await axios.post(
          'https://www.2wo1ne.uz/api/v1/registration/',
          {
            username: e.firstName,
            email: e.email,
            password: e.password
          },
          {
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers':
                'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, access-control-allow-methods'
            }
          }
        );

        login(user.data?.username, user.data?.email);
        toast.success('Success');
        onSuccess(true);
      } catch (err) {
        console.log(err);
        // @ts-ignore
        toast.error(err?.message);
      }
    };

    res();

    // onSuccess(true);
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default CreateAccountAuth;
