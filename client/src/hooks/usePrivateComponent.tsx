import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../types';

export const usePrivateComponent = () => {
  const Comp: FC<{ fallback?: any }> = ({ children, fallback }) => {
    const authState = useSelector((state: IStore) => state.auth);
    return authState.isLoggedIn
      ? (children as NonNullable<any>)
      : fallback || null;
  };

  return Comp;
};
