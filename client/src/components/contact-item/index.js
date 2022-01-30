import React from 'react';

export function ContactItem({ name, phone }) {
  return (
    <article>
      <h3>Name: {name}</h3>
      <div>Phone: {phone}</div>
      <a href={'tel:' + phone}>Call</a>
    </article>
  );
}