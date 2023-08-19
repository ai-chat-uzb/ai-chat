import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'ai-ui-kit/lib/components';

import useAxiosPrivate from 'hooks/use-axios-private';

const useSearch = ({ keyword = '', isAccessToken }: { keyword: string; isAccessToken: string }) => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isRefetching } = useQuery([`search/${keyword}`, 'lits'], async () => {
    try {
      const data = await axiosPrivate.get(`/search_user/`, {
        params: {
          keyword
        }
      });

      return data.data.users;
    } catch (error) {
      // @ts-ignore
      toast.error(String(error?.message));
      return navigate('/login', { state: { from: location }, replace: true });
    }
  });

  return { data, isLoading, isRefetching };
};

export default useSearch;
