import { Button } from 'antd';
import React, { useContext } from 'react';
import { LoadingContext } from '../../utils';
import SessionManager, { SessionContext } from '../../utils/SessionManager';

type Props = {};

const User = (props: Props) => {
  const { handleLogout } = useContext(SessionContext);
  const { eventLoading } = useContext(LoadingContext);
  /* Router */
  /* State */
  /* Functions */
  const onLogout = () => {
    eventLoading(handleLogout);
  };
  /* Hooks */
  /* Render */
  return (
    <div>
      User
      <div>
        <Button onClick={onLogout}>로그아웃</Button>
      </div>
    </div>
  );
};

export default User;
