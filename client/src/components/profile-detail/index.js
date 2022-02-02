import React from 'react';
import styles from './styles.module.scss';

export function ProfileDetail({ id, name }) {
  return (
    <div className={styles.profile}>
      <h2 className={styles.profile__title}>This is Profile page</h2>
      <div className={styles.profile__detail}>
        <dl><dt>Name:</dt><dd>{name}</dd></dl>
        <dl><dt>UserId:</dt><dd>{id}</dd></dl>
      </div>
    </div>
  );
}