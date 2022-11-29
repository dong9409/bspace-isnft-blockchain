import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IndexLayout, Loading } from '../components';
import { LoadingContext } from '../utils/LoadingManager';

import { Auth, Creation, Main, Workspace } from './pages';


const IndexRouter = () => {
  /* Router */
  /* State */
  const { isLoading } = useContext(LoadingContext);
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    <>
      {isLoading && <Loading />}
      <Routes>
        <Route element={<IndexLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="creation">
            <Route index element={<Workspace />} />
            <Route path="editor" element={<Creation />} />
            <Route path="editor/:content_id" element={<Creation />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default IndexRouter;
