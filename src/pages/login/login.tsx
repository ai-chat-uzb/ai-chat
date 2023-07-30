import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icons, Input, Password, Typography } from 'ai-ui-kit/lib/components';
import { TopBar } from 'layout';
import { Form } from 'modules/login';

import loginImage from 'assets/images/login/login.svg';

import cls from './login.module.scss';

interface LoginProps {}

const Login: FC<LoginProps> = () => (
  <div className={cls.wrapper}>
    <div className={cls.container}>
      <div className={cls.left}>
        <TopBar
          leftElement={<Icons size={40} name="logo" color="--color-heisenberg-5" />}
          rightElement={
            <Link to="/sign-up">
              <Typography size={16} lineHeight={24} weight={500} color="--webkit-blue-green" linearGradients>
                Sign Up
              </Typography>
            </Link>
          }
        />
        <Form.LoginAuth defaultValues={{ email: '', password: '' }}>
          {({ control, formState: { errors } }) => (
            <div className={cls['content-body']}>
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
                <Input
                  control={control}
                  errorMsg={errors.email?.message}
                  type="text"
                  name="email"
                  placeholder="Email"
                  label="Email"
                />
              </div>
              <div className={cls.card}>
                <Password
                  control={control}
                  errorMsg={errors.password?.message}
                  name="password"
                  placeholder="Password"
                  label="Password"
                />
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
            </div>
          )}
        </Form.LoginAuth>
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

export default Login;
