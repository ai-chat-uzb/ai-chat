import React, { FC, useEffect, useState } from 'react';
import { Input, Modal, UserCard } from 'ai-ui-kit/lib/components';
import Icon from 'ai-ui-kit/lib/components/icon/icon';
import { Types } from 'modules/search-bar';
import useSearch from 'modules/search-bar/hooks/useSearch';
import { useForm } from 'react-hook-form';

import cls from './search-bar.module.scss';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const { control, watch } = useForm<Types.IForm.SearchProps>({ defaultValues: { search: '' } });
  const { users, isLoading } = useSearch({ keyword: watch('search') });
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
  }, [open, watch('search')]);

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
                  users.map((item: any) => (
                    <UserCard
                      key={item.id}
                      url={item.photo_url}
                      username={item.username || item.first_name}
                      title={item.first_name || item.email}
                      size="small"
                      status="off"
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
          <Icon name="search" color="--color-black-4" size={20} /> <span>Search</span>
        </div>
        <div className={cls.keyboard}>⌘ K</div>
      </div>
    </div>
  );
};

export default SearchBar;
