import { FC, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { useAuth } from 'hooks';
import useAxiosPrivate from 'hooks/use-axios-private';

import { IForm } from '../type';

import { userSettings } from './schema';

interface UserSettingsProps {
  defaultValues?: IForm.IUserSettings;
  children: (data: UseFormReturn<IForm.IUserSettings>) => ReactNode;
  onSuccess?: (data: IForm.IUserSettings) => void;
}

const UserSettings: FC<UserSettingsProps> = ({ defaultValues, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const data = useForm({ defaultValues, resolver: yupResolver(userSettings) });
  const { usernameHandler, firstUsernameHandler, user } = useAuth();

  const onSubmit: SubmitHandler<IForm.IUserSettings> = (e: any) => {
    const res = async () => {
      try {
        const users = await axiosPrivate.put('/username_reset/', {
          username: e.username,
          photo_url: user.avatarUrl
        });

        toast.success('Successfully updated');
        usernameHandler(users.data.username);
      } catch (err) {
        // @ts-ignore
        toast.error(err?.message);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    res();

    if (!user.username) {
      firstUsernameHandler();
    }

    data.reset();
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default UserSettings;
