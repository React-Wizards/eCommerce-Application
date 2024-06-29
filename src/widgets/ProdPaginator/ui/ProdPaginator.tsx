import { useState } from 'react';
import styles from './ProdPaginator.module.scss';

interface IProps {
  currentPage: number;
  pageSize: number;
  totalItemsCount: number;
  onPageButtonClickHandler: (n: number) => void;
}

const ProdPaginator = ({
  currentPage,
  pageSize,
  totalItemsCount,
  onPageButtonClickHandler
}: IProps) => {
  const [portionNumber, setPortionNumber] = useState<number>(1);
  const pagesCount: number = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = Array.from(
    { length: pagesCount },
    (_, index: number): number => index + 1
  );
  const portionSize: number = 4;
  const portionCount: number = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber: number = portionNumber * portionSize;

  return (
    <div className={styles.prodPaginatorContrainer}>
      {portionNumber > 1 && (
        <div
          className={styles.pageButton}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
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
                p === currentPage ? styles.currentPageButton : ''
              ].join(' ')}
              key={p}
              onClick={() => {
                onPageButtonClickHandler(p);
              }}
            >
              {p}
            </div>
          );
        })}
      {portionCount > portionNumber && (
        <div
          className={styles.pageButton}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          {'>'}
        </div>
      )}
    </div>
  );
};

export default ProdPaginator;
