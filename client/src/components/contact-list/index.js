import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { ContactItem } from '../contact-item';
import styles from './styles.module.scss';
import { useHttp } from '../../hooks/useHttp.hook';
import { useAuth } from '../../hooks/useAuth.hook';

export function ContactList({ list }) {
  const { request, loading } = useHttp();
  const { token } = useAuth();
  const { userName } = useContext(AuthContext);

  const deleteHandler = useCallback(async id => {
    try {
      const data = await request(`/api/contacts/delete/${id}`, 'POST', { id }, {
        Authorization: `Bearer ${token}`
      });
      console.log('DeleteContact: ', data);
    } catch (e) {}
  }, [request, token]);

  return (
    <section className={styles.contacts}>
      <h2 className={styles.contacts__title}>{userName} contacts</h2>
      <Link to="/contacts/add">
        <Box sx={{ flexGrow: 0, cursor: 'pointer', paddingTop: '20px' }}>
          <Tooltip title="Add new contact">
            <Avatar sx={{ backgroundColor: '#000' }}>
              <AddIcon />
            </Avatar>
          </Tooltip>
        </Box>
      </Link>
      {
        !loading &&
        <div className={styles.contacts__grid}>
            {list?.map(({ _id, name, phone }) => <ContactItem
              key={_id}
              _id={_id}
              name={name}
              phone={phone}
              onDelete={deleteHandler}
            />)}
        </div>
      }
    </section>
  );
}