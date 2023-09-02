import React, { FC, useEffect, useState } from 'react';
import { Input, Modal, UserCard } from 'ai-ui-kit/lib/components';
import Icon from 'ai-ui-kit/lib/components/icon/icon';
import { useRoom } from 'modules/room/hooks';
import { Hooks, Types } from 'modules/search-bar';
import { useForm } from 'react-hook-form';

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
    }, 500);

    // @ts-ignore
    setTypingTimeout(newTimeout);

    return () => clearTimeout(newTimeout);
  }, [watch('search')]);

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
                  users.map(item => (
                    <UserCard
                      key={item.id}
                      url={item.photoUrl}
                      username={item.username ? `@${item.username}` : item.email}
                      title={item.firstName || item.email}
                      size="small"
                      status="off"
                      onClick={() => mutate({ id: item.id })}
                    />
                  ))
                ) : (
                  <h1>Not found</h1>
                )}
              </div>
            ) : (
              <div className={cls.loader}>
                <svg
                  className={cls.sharingan}
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g className={cls.full_pupille}>
                    <circle cx="50%" cy="50%" r="30" className={cls.iris} />
                    <circle cx="50%" cy="50%" r="10" className={cls.pupille} />

                    <text id="irisanomalie" className={cls.irisanomalie} transform="rotate(180 30,8)">
                      ,
                    </text>
                    <use xlinkHref="#irisanomalie" transform="rotate(120 50,50)" />
                    <use xlinkHref="#irisanomalie" transform="rotate(240 50,50)" />
                  </g>
                </svg>
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
