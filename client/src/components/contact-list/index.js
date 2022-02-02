import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { ContactItem } from '../contact-item';
import styles from './styles.module.scss';

export function ContactList({ list }) {
  const { userName } = useContext(AuthContext);

  return (
    <section className={styles.contacts}>
      <h2 className={styles.contacts__title}>{userName} contacts</h2>
      <Link to="/contacts/add">
        <Box sx={{ flexGrow: 0, cursor: 'pointer' }}>
          <Tooltip title="Add new contact">
            <Avatar sx={{ backgroundColor: '#000' }}>
              <AddIcon />
            </Avatar>
          </Tooltip>
        </Box>
      </Link>
      <div className={styles.contacts__grid}>
        {list?.map(({ _id, name, phone }) => <ContactItem
          key={_id}
          _id={_id}
          name={name}
          phone={phone}
        />)}
      </div>
    </section>
  );
}