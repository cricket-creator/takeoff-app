import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { ContactsPage } from '../pages/ContactsPage';
import { ContactForm } from '../components/contact-form';

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<AuthPage />} />
        <Route path="/contacts" exact element={<ContactsPage />} />
        <Route path="/contacts/add" element={<ContactForm />} />
        <Route path="/contacts/edit/:id" element={<ContactForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="profile" exact element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};