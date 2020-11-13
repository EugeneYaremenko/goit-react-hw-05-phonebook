import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';
import fade from './fade.module.css';

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <TransitionGroup component="ul" className={styles.list}>
      {contacts.map(({ name, number, id }) => (
        <CSSTransition key={id} timeout={250} classNames={fade}>
          <li className={styles.listItem} key={id}>
            <div>
              {name}: {number}
            </div>
            <button
              className={styles.deleteBtn}
              type="button"
              onClick={() => onRemoveContact(id)}
            >
              Delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
      onRemoveContact: PropTypes.func,
    }),
  ),
};

export default ContactList;
