import { useQuery } from '@tanstack/react-query';
import { toast } from 'ai-ui-kit/lib/components';
import { axios } from 'api';

import { useAuth } from 'hooks';

const useRefetch = ({ email, password }: { email: string; password: string }) => {
  const { token } = useAuth();
  const { data } = useQuery(['token'], async () => {
    try {
      const user = await axios.post(
        '/token/',
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      token(user.data.access, user.data.refresh);
      toast.success('Success');
    } catch (err) {
      // @ts-ignore
      toast.error(err?.message);
    }
  });

  return data;
};

export default useRefetch;
