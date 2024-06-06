import { useState } from 'react';
import styles from './ProdPaginator.module.scss';

const ProdPaginator = (props: {
  currentPage: number;
  pageSize: number;
  totalItemsCount: number;
  onPageButtonClickHandler: (n: number) => void;
}) => {
  const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionSize = 4;

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);

  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.prodPaginatorContrainer}>
      {portionNumber > 1 && (
        <div
          className={styles.pageButton}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}>
          {'<'}
        </div>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <div
              className={[
                styles.pageButton,
                p === props.currentPage ? styles.currentPageButton : ''
              ].join(' ')}
              key={p}
              onClick={() => {
                props.onPageButtonClickHandler(p);
              }}>
              {p}
            </div>
          );
        })}
      {portionCount > portionNumber && (
        <div
          className={styles.pageButton}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}>
          {'>'}
        </div>
      )}
    </div>
  );
};

export default ProdPaginator;
