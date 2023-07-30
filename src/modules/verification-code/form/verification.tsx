import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import axios from 'axios';
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
  const { user, authenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IVerification.FormVerification> = async (e: any) => {
    const res = async () => {
      try {
        await axios.post(
          'https://www.2wo1ne.uz/api/v1/verification/',
          {
            email: user?.email,
            ver_code: e.verCode
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

        toast.success('Success');

        navigate('/');
        authenticated();
      } catch (err) {
        console.log(err);
        // @ts-ignore
        toast.error(err?.message);
      }
    };

    res();
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default Verification;
