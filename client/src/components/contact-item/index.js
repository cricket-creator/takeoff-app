import React from 'react';
import { Link } from 'react-router-dom';
import { Call, Edit, Delete } from '@mui/icons-material';
import styles from './styles.module.scss';

export function ContactItem({ _id, name, phone, onDelete }) {
  return (
    <article className={styles.contact}>
      <h3 className={styles.contact__title}>Name: {name}</h3>
      <div className={styles.contact__phone}>Phone: {phone}</div>
      <div className={styles.contact__btns}>
        <a href={'tel:' + phone} className={`${styles.btns__call} ${styles.btns__btn}`}><Call /></a>
        <Link to={`/contacts/edit/${_id}`} className={`${styles.btns__edit} ${styles.btns__btn}`}>
          <button type="button"><Edit /></button>
        </Link>
        <button
          type="button"
          className={`${styles.btns__delete} ${styles.btns__btn}`}
          onClick={() => onDelete(_id)}
        >
          <Delete />
        </button>
      </div>
    </article>
  );
}