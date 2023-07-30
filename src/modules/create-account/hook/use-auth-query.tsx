import { toast } from 'ai-ui-kit/lib/components';
import axios from 'axios';

import { IForm } from '../type';

import useAuth from './use-auth';

const AuthQuery = (data: IForm.ICreateAccount) => {
  const { login } = useAuth();
  const userGets = async () => {
    try {
      const user = await axios.post('http://www.2wo1ne.uz/api/v1/registration/', {
        username: data.firstName,
        email: data.email,
        password: data.password
      });

      console.log('user', user);
      login({
        firstName: user.data.first_name,
        email: user.data.email,
        avatarUrl: '',
        lastName: user.data.last_name,
        username: '',
        id: user.data.id
      });
      toast.success('Success');
    } catch (err) {
      console.log(err);
      // @ts-ignore
      toast.success(err?.message);
    }
  };

  userGets();
};

export default AuthQuery;
