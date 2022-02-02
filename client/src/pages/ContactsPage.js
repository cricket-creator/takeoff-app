import React, { useCallback, useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { ContactList } from '../components/contact-list';
import { useHttp } from '../hooks/useHttp.hook';
import { AuthContext } from '../context/AuthContext';

export function ContactsPage() {
  const [list, setList] = useState(null);
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();

  const contactsHandler = useCallback(async () => {
    try {
      const data = await request('/api/contacts', 'GET', null, {
        Authorization: `Bearer: ${token}`
      });
      setList(data.contacts);
    } catch (e) {}
  }, [request, token]);

  useEffect(() => {
    contactsHandler();
  }, [contactsHandler]);

  return (
    <>
      {
        !loading ? <ContactList list={list} onReload={contactsHandler}/> : <CircularProgress />
      }
    </>
  );
}