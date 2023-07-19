import { FC } from 'react';
import { Button, Icons, Input, Password, Typography } from 'ai-ui-kit/lib/components';
import { TopBar } from 'layout';
import { useForm } from 'react-hook-form';

import loginImage from 'assets/images/login/login.svg';

import cls from './login.module.scss';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { control, handleSubmit } = useForm<{
    firstName: string;
    password: string;
  }>({
    defaultValues: {
      firstName: '',
      password: ''
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
                Sign Up
              </Typography>
            }
          />
          <form className={cls['content-body']} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.text}>
              <Typography size={36} lineHeight={44} weight={400} color="--color-white">
                Let's get
              </Typography>
              <Typography
                size={36}
                lineHeight={44}
                weight={600}
                color="--webkit-day-blue-blue-green-500"
                linearGradients
              >
                creative!
              </Typography>
            </div>
            <Typography size={18} lineHeight={28} weight={500} margin="0 0 24px 0" color="--color-black-3">
              Log in to Artificium to start creating magic.
            </Typography>
            <div className={cls.card}>
              <Input control={control} type="text" name="firstName" placeholder="First name" label="First name" />
            </div>
            <div className={cls.card}>
              <Password control={control} name="password" placeholder="Password" label="Password" />
            </div>
            <div className={cls['card-check']}>
              <div className={cls.text}>
                <Icons size={24} name="checkSquare" />
                <Typography size={16} lineHeight={24} weight={500} color="--color-black-2">
                  Remember me
                </Typography>
              </div>
              <Typography size={16} lineHeight={24} weight={500} color="--webkit-blue-green" linearGradients>
                Forgot Password?
              </Typography>
            </div>
            <Button htmlType="submit" size="large" width="100%" colorView="full" view="green">
              Log in
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
          <img src={loginImage} alt="img not found" className={cls['login-image']} />
        </div>
      </div>
    </div>
  );
};

export default Login;
