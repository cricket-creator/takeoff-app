import React from 'react';
import styles from './styles.module.scss';

export function AuthForm({ values: { email, password }, ...handlers }) {
  return (
    <form className={styles.form}>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          placeholder="Entry email"
          type="email"
          name="email"
          value={email}
          onChange={handlers.onChange}
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          id="password"
          placeholder="Entry password"
          type="password"
          name="password"
          value={password}
          onChange={handlers.onChange}
        />
      </label>
      <button
        type="button"
        className={styles.btn}
        disabled={!email && !password}
        onClick={handlers.onLogin}
      >
        Login
      </button>
      <button
        type="button"
        className={styles.btn}
        disabled={!email && !password}
        onClick={handlers.onRegister}
      >
        Register
      </button>
    </form>
  );
}