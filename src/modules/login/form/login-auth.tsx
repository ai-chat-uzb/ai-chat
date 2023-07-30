import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import axios from 'axios';
import { useAuth } from 'modules/create-account/hook';
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
  const { token, login, isAccessToken } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IForm.ILoginAuth> = (e: any) => {
    const res = async () => {
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

        console.log(user.data);
        token(user.data.access);
        toast.success('Success');
      } catch (err) {
        console.log(err);
        // @ts-ignore
        toast.error(err?.message);
      }
    };

    res();

    const response = async () => {
      console.log(isAccessToken);
      try {
        const user = await axios.get('https://www.2wo1ne.uz/api/v1/user_detail/', {
          headers: {
            Authorization: `Bearer ${isAccessToken}`
          }
        });

        console.log(user);

        login({
          firstName: user.data.first_name,
          email: user.data.email,
          avatarUrl: '',
          lastName: user.data.last_name,
          username: '',
          id: user.data.id
        });
        toast.success('Success');
        navigate('/');
      } catch (err) {
        console.log(err);
        // @ts-ignore
        toast.error(err?.message);
      }
    };

    response();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  // isAccessToken && user(isAccessToken);

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default LoginAuth;
