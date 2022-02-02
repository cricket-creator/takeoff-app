import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp.hook';
import { useMessage } from '../../hooks/useMessage.hook';
import styles from '../auth-form/styles.module.scss';

export function ContactForm() {
  const { request, error, clearError } = useHttp();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '', phone: '',
  });
  const navigate = useNavigate();
  const message = useMessage();
  const contactId = useParams().id;

  useEffect(() => {
    message(error);
    clearError();
  }, [message, error, clearError]);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
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

  const addContactHandler = useCallback(async (event) => {
    event.preventDefault();

    try {
      const data = await request('/api/contacts/add', 'POST', { ...form }, {
        Authorization: `Bearer ${token}`
      });
      message(data.message);
      navigate('/contacts');
    } catch (e) {}
  }, [form, token, request, navigate, message]);

  const editContactHandler = useCallback(async (event) => {
    event.preventDefault();

    try {
      const data = await request(`/api/contacts/edit/${contactId}`, 'POST', { ...form, id: contactId }, {
        Authorization: `Bearer ${token}`
      });
      message(data.message);
      navigate('/contacts');
    } catch (e) {}
  }, [request, token, contactId, form, navigate, message]);

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