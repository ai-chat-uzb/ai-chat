import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { axios } from 'service';

import { useAuth } from 'hooks';

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
          '/registration/',
          {
            first_name: e.firstName,
            last_name: e.lastName,
            email: e.email,
            password: e.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        login({
          firstName: user.data.first_name,
          email: user.data.email,
          photoUrl: '',
          lastName: user.data.last_name,
          username: '',
          id: user.data.id,
          password: e.password
        });
        toast.success({ content: 'Authorization completed' });
        onSuccess(true);
      } catch (err) {
        // @ts-ignore
        toast.error(err?.message);
      }
    };

    res();
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default CreateAccountAuth;
