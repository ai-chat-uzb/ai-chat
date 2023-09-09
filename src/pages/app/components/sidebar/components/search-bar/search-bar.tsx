import { FC, useEffect, useState } from 'react';
import { Input, Modal, toast, UserCard } from 'ai-ui-kit/lib/components';
import Icon from 'ai-ui-kit/lib/components/icon/icon';
import Lottie from 'lottie-react-component';
import { useRoom } from 'modules/room/hooks';
import { Hooks, Types } from 'modules/search-bar';
import { useForm } from 'react-hook-form';

import notFoundJson from 'assets/lottie/not-found/not-found.json';
import searchJson from 'assets/lottie/search/search.json';

import cls from './search-bar.module.scss';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const { control, watch } = useForm<Types.IForm.SearchProps>({ defaultValues: { search: '' } });
  const [search, setSearch] = useState('');
  const { users, isLoading } = Hooks.useSearch({ keyword: search });
  const { mutate } = useRoom();
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: { metaKey: any; ctrlKey: any; key: string }) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        setOpen(!open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      setSearch(watch('search'));
    }, 800);

    // @ts-ignore
    setTypingTimeout(newTimeout);

    return () => clearTimeout(newTimeout);
  }, [watch('search'), search]);

  return (
    <div className={cls.wrapper}>
      <Modal title="Search Bar" footer={false} open={open} onCancel={() => setOpen(!open)}>
        <div>
          <div className={cls['search-form']}>
            <Input control={control} type="text" name="search" placeholder="Search..." />
          </div>
          <div className={cls['search-list']}>
            {!isLoading ? (
              <div className={cls.lists}>
                {users?.length > 0 ? (
                  users.map(({ id, photoUrl, username, email, firstName }) => (
                    <UserCard
                      key={id}
                      url={photoUrl}
                      username={username ? `@${username}` : email}
                      title={firstName || email}
                      size="small"
                      status="off"
                      onClick={() => {
                        mutate({ id });
                        toast.success({ content: `Contact was established with ${username || firstName}` });
                        setOpen(!open);
                      }}
                    />
                  ))
                ) : (
                  <div className={cls.loader}>
                    <Lottie animationData={notFoundJson} loop />
                  </div>
                )}
              </div>
            ) : (
              <div className={cls.loader}>
                <Lottie animationData={searchJson} loop />
              </div>
            )}
          </div>
        </div>
      </Modal>
      <div className={cls.container} onClick={() => setOpen(!open)}>
        <div className={cls.row}>
          <Icon name="search" color="--color-black-4" size={22} /> <span>Search</span>
        </div>
        <div className={cls.keyboard}>⌘ K</div>
      </div>
    </div>
  );
};

export default SearchBar;
