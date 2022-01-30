import React, { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp.hook';
import styles from '../auth-form/styles.module.scss';

export function ContactForm() {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '', phone: ''
  });

  const changeHandler = evt => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const addContactHandler = useCallback(async () => {
    try {
      const data = await request('/api/contacts/add', 'POST', { ...form }, {
        Authorization: `Bearer ${token}`
      });
      console.log('AddContact: ', data);

    } catch (e) {}
  }, [form, token, request]);

  return (
    <form className={styles.form}>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          placeholder="Entry name"
          type="text"
          name="name"
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
          onChange={changeHandler}
        />
      </label>
      <button
        type="submit"
        className={styles.btn}
        disabled={!form.phone}
        onClick={addContactHandler}
      >
        Add to contact
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