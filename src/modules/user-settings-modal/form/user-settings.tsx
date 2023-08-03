import { FC, ReactNode } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'ai-ui-kit/lib/components';
import axios from 'axios';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { useAuth } from 'hooks';

import { IForm } from '../type';

import { userSettings } from './schema';

interface UserSettingsProps {
  defaultValues?: IForm.IUserSettings;
  children: (data: UseFormReturn<IForm.IUserSettings>) => ReactNode;
  onSuccess?: (data: IForm.IUserSettings) => void;
}

const UserSettings: FC<UserSettingsProps> = ({ defaultValues, children, onSuccess }) => {
  const data = useForm({ defaultValues, resolver: yupResolver(userSettings) });
  const { usernameHandler, firstUsernameHandler, user, isAccessToken } = useAuth();

  const onSubmit: SubmitHandler<IForm.IUserSettings> = (e: any) => {
    const res = async () => {
      try {
        const users = await axios.put(
          'https://www.2wo1ne.uz/api/v1/username_reset/',
          {
            username: e.username,
            photo_url: user.avatarUrl
          },
          {
            headers: {
              Authorization: `Bearer ${isAccessToken}`
            }
          }
        );

        usernameHandler(users.data.username);
      } catch (err) {
        // @ts-ignore
        toast.error(err?.message);
      }
    };

    res();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !user.username && firstUsernameHandler();

    data.reset();
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default UserSettings;
