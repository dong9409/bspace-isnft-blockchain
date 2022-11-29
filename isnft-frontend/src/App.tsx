import React from 'react';
import IndexRouter from './routes';
import LoadingManager from './utils/LoadingManager';
import SessionManager from './utils/SessionManager';
import Web3Connect from './utils/Web3Connect';

type Props = {};

const App = (props: Props) => {
  /* Router */
  /* State */
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <>
      <SessionManager>
        <Web3Connect>
          <LoadingManager>
            <IndexRouter />
          </LoadingManager>
        </Web3Connect>
      </SessionManager>
    </>
  );
};

export default App;
