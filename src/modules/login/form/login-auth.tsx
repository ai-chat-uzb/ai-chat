import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { axios } from 'service';

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
  const { token, login, authenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IForm.ILoginAuth> = ({ email, password }) => {
    const res = async () => {
      try {
        const user = await axios.post(
          '/token/',
          {
            email,
            password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        token(user.data.access, user.data.refresh);
        login({
          firstName: user.data.first_name,
          email: user.data.email,
          photoUrl: user.data.photo_url,
          lastName: user.data.last_name,
          username: user.data.username,
          id: user.data.id,
          password: ''
        });
        toast.success('Success');
        authenticated();
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
