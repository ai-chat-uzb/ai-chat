import { useQuery } from '@tanstack/react-query';
import axios from 'api/axios';

const useSearch = ({ keyword = '', isAccessToken }: { keyword: string; isAccessToken: string }) => {
  const { data, isLoading, isRefetching } = useQuery([`search/${keyword}`, 'lits'], async () => {
    const data = await axios.get(`/search_user/`, {
      params: {
        keyword
      },
      headers: {
        Authorization: `Bearer ${isAccessToken}`
      }
    });

    return data.data.users;
  });

  return { data, isLoading, isRefetching };
};

export default useSearch;
