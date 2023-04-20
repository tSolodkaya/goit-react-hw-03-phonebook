import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ nameForFind, onFilter }) => {
  return (
    <div className={css.filterContainer}>
      <label className={css.filterName}>
        Find contacts by name
        <input
          className={css.filterInput}
          type="text"
          name="filter"
          value={nameForFind}
          onChange={onFilter}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  nameForFind: PropTypes.string.isRequired,
  onFilter: PropTypes.func,
};

export default Filter;
