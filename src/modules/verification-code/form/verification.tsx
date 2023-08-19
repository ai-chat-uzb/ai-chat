import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import { axios } from 'api';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { useAuth } from 'hooks';

import { IVerification } from '../type';

import { verificationSchema } from './schema';

interface VerificationProps {
  onSuccess?: (data: IVerification.FormVerification) => void;
  children: (date: UseFormReturn<IVerification.FormVerification>) => ReactNode;
  defaultValues?: IVerification.FormVerification;
}

const Verification: FC<VerificationProps> = ({ defaultValues, children, onSuccess }) => {
  const data = useForm<IVerification.FormVerification>({ defaultValues, resolver: yupResolver(verificationSchema) });
  const { user, authenticated, token, login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IVerification.FormVerification> = async (e: any) => {
    try {
      await axios.post(
        '/verification/',
        {
          email: user?.email,
          ver_code: e.verCode
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Success');

      navigate('/');
      authenticated();
    } catch (err) {
      // @ts-ignore
      toast.error(err?.message);
    }
    try {
      const data = await axios.post(
        '/token/',
        {
          email: user.email,
          password: user.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers':
              'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, access-control-allow-methods'
          }
        }
      );

      token(data.data.access, data.data.refresh);
      toast.success('Success');
    } catch (err) {
      // @ts-ignore
      toast.error(err?.message);
    }
    login({ ...user, password: '' });
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default Verification;
