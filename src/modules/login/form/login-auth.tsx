import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import { axios } from 'api';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { useAuth } from 'hooks';

import { IForm } from '../type';

import { loginSchema } from './schema';

interface LoginAuthProps {
  onSuccess?: (data: IForm.ILoginAuth) => void;
  children: (date: UseFormReturn<IForm.ILoginAuth>) => ReactNode;
  defaultValues?: IForm.ILoginAuth;
}

const LoginAuth: FC<LoginAuthProps> = ({ children, defaultValues, onSuccess }) => {
  const data = useForm<IForm.ILoginAuth>({ defaultValues, resolver: yupResolver(loginSchema) });
  const { token, login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IForm.ILoginAuth> = (e: any) => {
    const res = async () => {
      try {
        const user = await axios.post(
          '/token/',
          {
            email: e.email,
            password: e.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        token(user.data.access);
        login({
          firstName: user.data.first_name,
          email: user.data.email,
          avatarUrl: user.data.photo_url || '',
          lastName: user.data.last_name,
          username: user.data.username || '',
          id: user.data.id,
          password: ''
        });
        toast.success('Success');
        navigate('/');
      } catch (err) {
        // @ts-ignore
        toast.error(err?.message);
      }
    };

    res();
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default LoginAuth;
