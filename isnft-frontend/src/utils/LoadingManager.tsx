import React, { createContext, useState } from 'react';

const LoadingContext = createContext<any>(null);

export { LoadingContext };

type Props = {
  children: React.ReactNode;
};

const LoadingManager = (props: Props) => {
  /* Router */
  /* State */
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState<any>([]);
  /* Functions */

  const eventLoading = (callback: Function, time = 3000) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (callback) callback();
    }, time);
  };
  /* Hooks */
  /* Render */
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        handleLoading: setIsLoading,
        eventLoading,
        temp,
        setTemp,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingManager;
