import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp.hook';
import styles from '../auth-form/styles.module.scss';

export function ContactForm() {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '', phone: '',
  });
  const contactId = useParams().id;

  const changeHandler = evt => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const getContactInfo = useCallback(async () => {
    if (!contactId) return;

    try {
      const { contact } = await request(`/api/contacts/${contactId}`, 'GET', null, {
        Authorization: `Bearer: ${token}`
      });
      setForm({ ...form, name: contact.name, phone: contact.phone });
    } catch (e) {}
  }, [contactId, request, token, form]);

  const addContactHandler = useCallback(async () => {
    try {
      await request('/api/contacts/add', 'POST', { ...form }, {
        Authorization: `Bearer ${token}`
      });
    } catch (e) {}
  }, [form, token, request]);

  const editContactHandler = useCallback(async () => {
    try {
      await request(`/api/contacts/edit/${contactId}`, 'POST', { ...form, id: contactId }, {
        Authorization: `Bearer ${token}`
      });
    } catch (e) {}
  }, [request, token, contactId, form]);

  useEffect(() => {
    getContactInfo();
  }, []);

  return (
    <form className={styles.form}>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          placeholder="Entry name"
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="phone">
        Phone:
        <input
          id="phone"
          placeholder="Entry phone number"
          type="text"
          name="phone"
          value={form.phone}
          onChange={changeHandler}
        />
      </label>
      {contactId && <input type="hidden" name="id" value={contactId} />}
      <button
        type="submit"
        className={styles.btn}
        disabled={!form.phone}
        onClick={contactId ? editContactHandler : addContactHandler}
      >
        {contactId ? 'Edit contact' : 'Add to contact'}
      </button>
      <Link to="/contacts">
        <button
          type="button"
          className={styles.btn}
        >
        Cancel
      </button>
      </Link>
    </form>
  );
}