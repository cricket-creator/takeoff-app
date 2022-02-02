import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Tooltip } from '@mui/material';
import { Assignment, Close as CloseIcon } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import styles from '../header/styles.module.scss';

export function Navigation() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <div className={styles.header__nav}>
      <Link to="/profile">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile">
            <Avatar sx={{ backgroundColor: '#000' }} />
          </Tooltip>
        </Box>
      </Link>
      { isAuthenticated &&
        <Link to="/contacts">
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Contacts">
              <Avatar sx={{ backgroundColor: '#000' }}>
                <Assignment />
              </Avatar>
            </Tooltip>
          </Box>
        </Link>
      }
      {
        isAuthenticated &&
        <Box sx={{ flexGrow: 0, cursor: 'pointer' }} onClick={logout}>
          <Tooltip title="Exit">
            <Avatar sx={{ backgroundColor: '#000' }}>
              <CloseIcon />
            </Avatar>
          </Tooltip>
        </Box>
      }
    </div>
  );
}