import React, { useCallback, useState } from 'react';
import { AuthForm } from '../components/auth-form';
import { useHttp } from '../hooks/useHttp.hook';

export function AuthPage() {
  const { request } = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  const changeHandler = useCallback(evt => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  }, [form]);

  const registerHandler = useCallback(async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
    } catch (e) {}
  }, [form, request]);

  const loginHandler = useCallback(async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
    } catch (e) {}
  }, [form, request]);

  return (
    <AuthForm
      values={form}
      onChange={changeHandler}
      onRegister={registerHandler}
      onLogin={loginHandler}
    />
  );
}