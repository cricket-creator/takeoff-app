import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp.hook';
import { AuthContext } from '../context/AuthContext';
import { AuthForm } from '../components/auth-form';
import { ProfilePage } from './ProfilePage';
import { useMessage } from '../hooks/useMessage.hook';

export function AuthPage() {
  const { request, error, clearError } = useHttp();
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const message = useMessage();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = useCallback(event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }, [form]);

  const registerHandler = useCallback(async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  }, [form, request, message]);

  const loginHandler = useCallback(async () => {
    try {
      const { token, userId, name } = await request('/api/auth/login', 'POST', { ...form });
      login(token, userId, name);
      navigate('/contacts');
    } catch (e) {}
  }, [form, request, login, navigate]);

  return (
    <>
      {
        isAuthenticated ?
          <ProfilePage /> :
          <AuthForm
            values={form}
            onChange={changeHandler}
            onRegister={registerHandler}
            onLogin={loginHandler}
          />
      }
    </>
  );
}