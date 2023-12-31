import { toast } from 'ai-ui-kit/lib/components';
import axios from 'axios';

import { useAuth } from 'hooks';

import { IForm } from '../type';

const AuthQuery = (data: IForm.ICreateAccount) => {
  const { login } = useAuth();
  const userGets = async () => {
    try {
      const user = await axios.post('http://www.2wo1ne.uz/api/v1/registration/', {
        username: data.firstName,
        email: data.email,
        password: data.password
      });

      login({
        firstName: user.data.first_name,
        email: user.data.email,
        photoUrl: '',
        lastName: user.data.last_name,
        username: '',
        id: user.data.id,
        password: ''
      });
      toast.success({ content: 'Authorization completed' });
    } catch (err) {
      console.log(err);
      // @ts-ignore
      toast.success(err?.message);
    }
  };

  userGets();
};

export default AuthQuery;
