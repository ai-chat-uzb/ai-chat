import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import axios from 'axios';
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

  const onSubmit: SubmitHandler<IForm.ILoginAuth> = async (e: any) => {
    let tokens;

    try {
      const user = await axios.post(
        'https://www.2wo1ne.uz/api/v1/token/',
        {
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

      token(user.data.access);
      tokens = user.data.access;
      toast.success('Success');
    } catch (err) {
      // @ts-ignore
      toast.error(err?.message);
    }

    try {
      const user = await axios.get('https://www.2wo1ne.uz/api/v1/user_detail/', {
        headers: {
          Authorization: `Bearer ${tokens}`
        }
      });

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

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  // isAccessToken && user(isAccessToken);

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default LoginAuth;
