import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icons, Input, Password, Typography } from 'ai-ui-kit/lib/components';
import { TopBar } from 'layout';
import { Form } from 'modules/create-account';

import rightImage from 'assets/images/login/Illustration.svg';

import cls from './create-account..module.scss';

interface CreateAccountProps {}

const CreateAccount: FC<CreateAccountProps> = () => (
  <div className={cls.wrapper}>
    <div className={cls.container}>
      <div className={cls.left}>
        <TopBar
          leftElement={<Icons size={40} name="logo" color="--color-heisenberg-5" />}
          rightElement={
            <Link to="/login">
              <Typography size={16} lineHeight={24} weight={500} color="--webkit-blue-green" linearGradients>
                Log In
              </Typography>
            </Link>
          }
        />
        <Form.CreateAccountAuth
          defaultValues={{ firstName: '', lastName: '', password: '', resetPassword: '', email: '' }}
        >
          {({ control, formState: { errors } }) => (
            <div className={cls['content-body']}>
              <div className={cls.card}>
                <Input
                  control={control}
                  errorMsg={errors.firstName?.message}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  label="First name"
                />
                <Input
                  control={control}
                  errorMsg={errors.lastName?.message}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  label="Last name"
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
                <Password
                  control={control}
                  errorMsg={errors.resetPassword?.message}
                  name="resetPassword"
                  placeholder="Reset Password"
                  label="Reset Password"
                />
              </div>
              <div className={cls.card}>
                <Input
                  control={control}
                  errorMsg={errors.email?.message}
                  type="text"
                  name="email"
                  placeholder="Email"
                  label="Email"
                />
                <div />
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
            </div>
          )}
        </Form.CreateAccountAuth>
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

export default CreateAccount;
