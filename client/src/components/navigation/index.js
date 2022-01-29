import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Tooltip } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import styles from '../header/styles.module.scss';

export function Navigation() {

  return (
    <div className={styles.header__nav}>
      <Link to="/auth">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Log In / Register">
            <Avatar />
          </Tooltip>
        </Box>
      </Link>
      <Link to="/contacts">
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Contacts">
          <Avatar>
            <Assignment />
          </Avatar>
        </Tooltip>
        </Box>
      </Link>
    </div>
  );
}