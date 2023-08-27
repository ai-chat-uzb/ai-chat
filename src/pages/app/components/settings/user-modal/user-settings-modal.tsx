import { FC, useState } from 'react';
import { Avatar, Button, Input, Modal, Typography } from 'ai-ui-kit/lib/components';
import { AVATAR_DATA } from 'helpers/constants';
import { UserSettingsForm } from 'modules/user-settings-modal';

import { useAuth } from 'hooks';

import cls from './user-settings-modal.module.scss';

interface UserSettingsModalProps {}

const UserSettingsModal: FC<UserSettingsModalProps> = (props: UserSettingsModalProps) => {
  const { user, isSettingsModal, settingsModalHandler, isFirstUsernameModal } = useAuth();
  const [url, setUrl] = useState(user.avatarUrl || '');

  return (
    <div>
      <Modal
        open={isSettingsModal || !user.username}
        onCancel={() => {
          if (isFirstUsernameModal || user.username) {
            settingsModalHandler();
          }
        }}
        footer={false}
        title="Select your choice"
      >
        <div>
          <Typography
            weight={500}
            linearGradients
            color="--webkit-day-blue-blue-green-500"
            size={16}
            padding="20px 0 10px 0"
          >
            Avatar for boys
          </Typography>
          <div className={cls['img-wrap']}>
            {AVATAR_DATA.slice(0, 8).map(item => (
              <div key={item.id} onClick={() => setUrl(item.avatarUrl)}>
                <Avatar url={item.avatarUrl} status={url === item.avatarUrl ? 'active' : 'off'} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Typography
            weight={500}
            linearGradients
            color="--color-green-blue-day-blue-500"
            size={16}
            padding="20px 0 10px 0"
          >
            Avatar for girls
          </Typography>
          <div className={cls['img-wrap']}>
            {AVATAR_DATA.slice(8, 16).map(item => (
              <div key={item.id} onClick={() => setUrl(item.avatarUrl)}>
                <Avatar url={item.avatarUrl} status={url === item.avatarUrl ? 'active' : 'off'} />
              </div>
            ))}
          </div>
        </div>
        <div className={cls['emoji-wrap']}>
          <Typography weight={500} linearGradients color="--color-blue-green" size={16} padding="20px 0 10px 0">
            Emojis
          </Typography>
          <div className={cls['img-wrap']}>
            {AVATAR_DATA.slice(16, 24).map(item => (
              <div key={item.id} onClick={() => setUrl(item.avatarUrl)}>
                <Avatar url={item.avatarUrl} status={url === item.avatarUrl ? 'active' : 'off'} />
              </div>
            ))}
          </div>
        </div>
        <UserSettingsForm.UserSettings url={url} defaultValues={{ username: '' }}>
          {({ control, formState: { errors } }) => (
            <div>
              <Input
                control={control}
                errorMsg={errors.username?.message}
                name="username"
                type="text"
                label="Username"
                placeholder="Username"
              />
              <Button size="large" width="100%" colorView="full" view="glass" htmlType="submit" margin="30px 0 0 0">
                Submit
              </Button>
            </div>
          )}
        </UserSettingsForm.UserSettings>
      </Modal>
    </div>
  );
};

export default UserSettingsModal;
