import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { ContactsPage } from '../pages/ContactsPage';

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/auth" exact element={<AuthPage />} />
        <Route path="/contacts" exact element={<ContactsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/auth" exact element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};