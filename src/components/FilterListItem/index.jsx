const FilterListItem = ({ itemIdx, itemLabel, itemValue, onChange }) => {

  return (
    <li className="os-filter__item">
      <input
        className="os-filter__input"
        id={ `${itemIdx}_${itemLabel}` }
        type="checkbox"
        checked={ itemValue }
        onChange={ onChange }
      />
      <label className="os-filter__label" htmlFor={ `${itemIdx}_${itemLabel}` }>{ itemLabel }</label>
    </li>
  );
}

export default FilterListItem

