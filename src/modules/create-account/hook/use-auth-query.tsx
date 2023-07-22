import axios from 'axios';

import { IForm } from '../type';

const useAuthQuery = (data: IForm.ICreateAccount) => {
  const userGets = async () => {
    try {
      const user = await axios.get('', {
        data
      });

      console.log(user.data);
    } catch (err) {
      console.log(err);
    }
  };

  userGets();
};

export default useAuthQuery;
