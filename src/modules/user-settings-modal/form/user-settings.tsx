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
  url?: string;
}

const UserSettings: FC<UserSettingsProps> = ({ defaultValues, children, url }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const data = useForm({ defaultValues, resolver: yupResolver(userSettings) });
  const { usernameHandler, firstUsernameHandler, user, settingsModalHandler } = useAuth();

  const onSubmit: SubmitHandler<IForm.IUserSettings> = ({ username }) => {
    if (!url) toast.error({ content: 'Avatar not selected❓' });
    else {
      const res = async () => {
        try {
          const { data } = await axiosPrivate.put('/username_reset/', {
            username,
            photo_url: url
          });

          toast.success({ content: 'Successfully updated' });
          usernameHandler({ username: data.username, photoUrl: data.photo_url });
          settingsModalHandler();
        } catch (err: any) {
          toast.warning({
            content: err?.response.status === 404 ? 'This Nickname is already selected' : err?.message,
            duration: 3
          });
          navigate('/login', { state: { from: location }, replace: true });
        }
      };

      res();

      if (!user.username) {
        firstUsernameHandler();
      }
      data.reset();
    }
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default UserSettings;
