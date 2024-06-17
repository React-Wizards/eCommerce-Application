import { type ChangeEvent, useState } from 'react';
import styles from './CartItem.module.scss';

interface IBasket {
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

const CartItem = ({ basket }: { basket: IBasket }) => {
  const [quantity, setQuantity] = useState<number>(basket.quantity);
  const { name, price, image, size }: IBasket = basket;

  return (
    <>
      <tr>
        <td>
          <div className={styles.wrapper}>
            <img src={image} alt={name} />
            <div className={styles.info}>
              <span title={name}>{name}</span>
              <span>Size: {size}</span>
            </div>
          </div>
        </td>
        <td>${price.toFixed(2)}</td>
        <td>
          <button
            className={styles.button}
            onClick={() => {
              setQuantity((prev: number): number => Math.max(0, prev - 1));
            }}>
            -
          </button>
          <input
            className={styles.quantity}
            type='number'
            min='1'
            max='999'
            minLength={1}
            value={quantity}
            pattern='[1-9][0-9]*'
            style={{
              textAlign: 'center',
              width: '50px',
              marginInline: '5px',
              border: '2px solid black'
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              const currentQuantity: number = Number(event.target.value);
              const min: number = Number(event.target.min);
              const max: number = Number(event.target.max);

              if (currentQuantity < min || currentQuantity > max) {
                return;
              }

              setQuantity(currentQuantity);
            }}
          />
          <button
            className={styles.button}
            onClick={() => {
              setQuantity((prev: number): number => prev + 1);
            }}>
            +
          </button>
        </td>
        <td>${(price * quantity).toFixed(2)}</td>
        <td>
          <button>delete</button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
