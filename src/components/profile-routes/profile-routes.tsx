import React, { FC } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Profile from '../../pages/profile/profile';
import OrderList from '../../components/order-list/order-list';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ProfileProps {
  user: IUser;
}

const ProfileRoutes: FC<ProfileProps> = ({ user }) => {
  return (
    <div>
      <Profile user={user} />
      <Outlet />
    </div>
  );
};

export default ProfileRoutes;