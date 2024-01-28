import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Profile from '../../pages/profile/profile';
import { IUser } from '../../services/types/types';
export interface ProfileProps {
  user: IUser | null;
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