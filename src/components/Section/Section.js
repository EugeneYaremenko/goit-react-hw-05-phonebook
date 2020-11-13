import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import styles from './section.module.css';
import fadeStyles from './fade.module.css';

const Section = ({ title, children }) => {
  return (
    <section className={styles.section}>
      <CSSTransition in={true} appear={true} classNames={fadeStyles} timeout={500}>
        <h2 className={styles.title}>{title}</h2>
      </CSSTransition>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Section;
