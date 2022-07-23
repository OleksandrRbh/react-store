const PaginationItem = ({ itemIndex = 0, isActive = false, onPageItemClick }) => {

  let classNames = 'pages__item pg-control'
  if (isActive) classNames += ' active'

  return (
    <li>
      <span
        className={ classNames }
        data-page-index={ itemIndex }
        onClick={ () => onPageItemClick(itemIndex) }
      >
        {itemIndex + 1}
      </span>
    </li>
  );
}

export default PaginationItem

