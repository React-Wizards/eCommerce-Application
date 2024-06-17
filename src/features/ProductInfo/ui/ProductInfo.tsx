import {
  Attribute,
  Category,
  ProductProjection,
  ProductVariant
} from '@commercetools/platform-sdk';
import styles from './ProductInfo.module.scss';
import {
  defaultCurrencyCode,
  defaultLocale
} from '@/shared/constants/settings';
import { formatPriceString, getPriceFromProduct } from '@/shared/utils';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/store';
import { useGetCategoriesMutation } from '@/features/api/appApi';
import { Link } from 'react-router-dom';
import { setCategories } from '@/entities/category';
import { useDispatch } from 'react-redux';

interface IProps {
  product: ProductProjection;
}

const ProductInfo = (props: IProps) => {
  const dispatch = useDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const [requestCategories] = useGetCategoriesMutation();
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const currencyPrice = getPriceFromProduct(props.product, defaultCurrencyCode);
  const [selectedSize, setSelectedSize] = useState('');
  const cart = useAppSelector((state) => state.cart.cart);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [lineItemId, setLineItemId] = useState<string>('');
  const [lineItemQuantity, setLineItemQuantity] = useState<number>(0);
  const [removeFromCart] = useDeleteProductFromCartMutation();

  const productInCart = cart?.lineItems.filter(
    (item) => item.productId === props.product.id
  );

  useEffect(() => {
    setSelectedSize(
      props.product.masterVariant.attributes?.filter(
        (attr) => attr.name === 'size'
      )[0].value.key
    );

    const productCategoriesIds = props.product.categories.map((c) => c.id);

    if (props.product?.categories) {
      if (categories.length) {
        setProductCategories(
          categories.filter((cat) => productCategoriesIds.includes(cat.id))
        );
      } else {
        requestCategories()
          .unwrap()
          .then((cats) => dispatch(setCategories(cats.results)));
      }
    }

    if (productInCart?.length) {
      setIsInCart(true);
      setLineItemId(productInCart[0].id);
      setLineItemQuantity(productInCart[0].quantity);
    } else {
      setIsInCart(false);
    }
  }, [
    props,
    categories,
    requestCategories,
    dispatch,
    cart,
    isInCart,
    lineItemId,
    lineItemQuantity
  ]);

  const onSizeSelectHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    setSelectedSize(e.currentTarget.id);
  };

  const removeProduct = async (): Promise<void> => {
    if (cart) {
      await removeFromCart({
        cartVersion: cart.version,
        cartId: cart.id,
        lineItemId: lineItemId,
        lineItemQuantity: lineItemQuantity
      }).unwrap();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['product-header']}>
        <h1 className={styles['product-title']}>
          {props.product.name[defaultLocale]}
        </h1>
        <div className={styles.productPrice}>
          <span className={styles['product-price-sale']}>
            {currencyPrice?.discounted
              ? formatPriceString(currencyPrice?.discounted.value)
              : formatPriceString(currencyPrice?.value)}
          </span>
          <span className={styles['product-price']}>
            {currencyPrice?.discounted
              ? formatPriceString(currencyPrice.value)
              : null}
          </span>
        </div>
      </div>
      <div>
        <h3 className={styles['product-subtitle']}>Short description:</h3>
        <p className={styles['product-description']}>
          {props.product.description![defaultLocale]}
        </p>
      </div>
      <div>
        <h3 className={styles['product-subtitle']}>Size:</h3>
        <div className={styles['size-btns']}>
          <button
            id='small'
            className={[
              styles['size-btn'],
              selectedSize === 'small' ? styles._selected : ''
            ].join(' ')}
            disabled={
              ![props.product.masterVariant, ...props.product.variants].some(
                (v: ProductVariant) =>
                  (v.attributes as Attribute[]).filter(
                    (attr) => attr.name === 'size'
                  )[0].value.key === 'small'
              )
            }
            onClick={onSizeSelectHandler}>
            S
          </button>
          <button
            id='medium'
            className={[
              styles['size-btn'],
              selectedSize === 'medium' ? styles._selected : ''
            ].join(' ')}
            disabled={
              ![props.product.masterVariant, ...props.product.variants].some(
                (v: ProductVariant) =>
                  (v.attributes as Attribute[]).filter(
                    (attr) => attr.name === 'size'
                  )[0].value.key === 'medium'
              )
            }
            onClick={onSizeSelectHandler}>
            M
          </button>
          <button
            id='large'
            className={[
              styles['size-btn'],
              selectedSize === 'large' ? styles._selected : ''
            ].join(' ')}
            disabled={
              ![props.product.masterVariant, ...props.product.variants].some(
                (v: ProductVariant) =>
                  (v.attributes as Attribute[]).filter(
                    (attr) => attr.name === 'size'
                  )[0].value.key === 'large'
              )
            }
            onClick={onSizeSelectHandler}>
            L
          </button>
        </div>
      </div>

      <div className={styles.propsBox}>
        <span className={styles.propName}>Categories: </span>
        <span className={styles.propValue}>
          {productCategories.map((cat, ind) => (
            <Link to={`/categories/${cat.id}`} key={ind}>
              {`${cat.name[defaultLocale]}`}
            </Link>
          ))}
        </span>
      </div>
      <div className={styles.propsBox}>
        <span className={styles.propName}>SKU: </span>
        <span className={styles.propValue}>
          {props.product
            ? [props.product.masterVariant, ...props.product.variants].filter(
                (v) =>
                  (v.attributes as Attribute[]).filter(
                    (attr) => attr.name === 'size'
                  )[0].value.key === selectedSize
              )[0]?.sku
            : null}
        </span>
      </div>
      {isInCart && (
        <Button
          text='Remove from Cart'
          disabled={isClicked ? true : false}
          callback={() => {
            setIsClicked(true);
            removeProduct();
          }}
        />
      )}
    </div>
  );
};

export default ProductInfo;
