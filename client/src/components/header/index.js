import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@mui/material';
import { Navigation } from '../navigation';
import styles from './styles.module.scss';

export function Header() {
  return (
    <AppBar position="static" className={styles.header}>
      <div className="container">
        <div className={styles.header__wrap}>
          <Link to="/">
            <h1>PC</h1>
          </Link>
          <Navigation />
        </div>
      </div>
    </AppBar>
  );
}