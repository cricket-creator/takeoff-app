import React, { useContext } from 'react';
import { ProfileDetail } from '../components/profile-detail';
import { AuthContext } from '../context/AuthContext';

export function ProfilePage() {
  const { userId, userName } = useContext(AuthContext);

  return (
    <ProfileDetail id={userId} name={userName} />
  );
}