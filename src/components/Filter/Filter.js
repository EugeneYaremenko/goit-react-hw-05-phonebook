import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import styes from './filter.module.css';
import fade from './fade.module.css';

const Filter = ({ title, value, onChangeFilter }) => {
  return (
    <CSSTransition in={true} timeout={250} classNames={fade}>
      <div className={styes.filter}>
        <p>{title}</p>
        <input type="text" value={value} onChange={onChangeFilter} />
      </div>
    </CSSTransition>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
