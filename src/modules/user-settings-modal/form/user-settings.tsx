import { FC, ReactNode } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from 'modules/create-account/hook';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

import { IForm } from '../type';

import { userSettings } from './schema';

interface UserSettingsProps {
  defaultValues?: IForm.IUserSettings;
  children: (data: UseFormReturn<IForm.IUserSettings>) => ReactNode;
  onSuccess?: (data: IForm.IUserSettings) => void;
}

const UserSettings: FC<UserSettingsProps> = ({ defaultValues, children, onSuccess }) => {
  const data = useForm({ defaultValues, resolver: yupResolver(userSettings) });
  const { usernameHandler, firstUsernameHandler } = useAuth();

  const onSubmit: SubmitHandler<IForm.IUserSettings> = (e: any) => {
    usernameHandler(e.username);
    firstUsernameHandler();
    data.reset();
  };

  return <form onSubmit={data.handleSubmit(onSubmit)}>{children(data)}</form>;
};

export default UserSettings;
