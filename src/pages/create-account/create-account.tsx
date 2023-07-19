import { FC } from 'react';
import { Button, Icons, Input, Password, Typography } from 'ai-ui-kit/lib/components';
import { TopBar } from 'layout';
import { useForm } from 'react-hook-form';

import rightImage from 'assets/images/login/Illustration.svg';

import cls from './create-account..module.scss';

interface CreateAccountProps {}

const CreateAccount: FC<CreateAccountProps> = () => {
  const { control, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
    password: string;
    resetPassword: string;
  }>({
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      resetPassword: ''
    }
  });

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.container}>
        <div className={cls.left}>
          <TopBar
            leftElement={<Icons size={40} name="logo" color="red" />}
            rightElement={
              <Typography size={16} lineHeight={24} weight={500} color="--webkit-blue-green" linearGradients>
                Log In
              </Typography>
            }
          />
          <form className={cls['content-body']} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.card}>
              <Input control={control} type="text" name="firstName" placeholder="First name" label="First name" />
              <Input control={control} type="text" name="lastName" placeholder="Last name" label="Last name" />
            </div>
            <div className={cls.card}>
              <Password control={control} name="password" placeholder="Password" label="Password" />
              <Password control={control} name="resetPassword" placeholder="Reset Password" label="Reset Password" />
            </div>
            <div className={cls['card-check']}>
              <Icons size={24} name="checkSquare" />
              <div className={cls.text}>
                <Typography size={16} lineHeight={24} weight={500} color="--color-black-2">
                  I agree with
                </Typography>
                <Typography size={16} lineHeight={24} weight={500} color="--webkit-blue-green" linearGradients>
                  Terms and conditions
                </Typography>
              </div>
            </div>
            <Button htmlType="submit" size="large" width="100%" colorView="full" view="green">
              Create free account
            </Button>
          </form>
          <TopBar
            leftElement={
              <Typography size={14} weight={500} lineHeight={20} spacing={0.15} color="--color-black-3">
                Artificium.app © 2023
              </Typography>
            }
            rightElement={
              <Typography size={14} weight={500} lineHeight={20} spacing={0.15} color="--color-black-3">
                Privacy Policy
              </Typography>
            }
          />
        </div>
        <div className={cls.right}>
          <img src={rightImage} alt="img not found" className={cls['right-image']} />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
