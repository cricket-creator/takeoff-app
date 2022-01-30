import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp.hook';
import { AuthContext } from '../context/AuthContext';
import { AuthForm } from '../components/auth-form';
import { ProfilePage } from './ProfilePage';

export function AuthPage() {
  const { request } = useHttp();
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  const changeHandler = useCallback(evt => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  }, [form]);

  const registerHandler = useCallback(async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log('RegisterData: ', data);
    } catch (e) {}
  }, [form, request]);

  const loginHandler = useCallback(async () => {
    try {
      const { token, userId, name } = await request('/api/auth/login', 'POST', { ...form });
      console.log('LoginData: ', name);
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