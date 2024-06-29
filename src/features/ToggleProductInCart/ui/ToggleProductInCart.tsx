import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type {
  Cart,
  LineItem,
  ProductProjection
} from '@commercetools/platform-sdk';
import type { RootState } from '@/app/store';
import Button from '@/shared/Button';
import Loader from '@/shared/Loader';
import {
  useAddProductToCartMutation,
  useDeleteProductFromCartMutation
} from '@/features/api/meApi';
import { setCart } from '@/entities/cart';

const ToggleProductInCart = ({ product }: { product: ProductProjection }) => {
  const cart: Cart | null = useSelector<RootState, Cart | null>(
    (store: RootState): Cart | null => store.cart.cart
  );
  const dispatch = useDispatch();
  const [addProductToCart, { isLoading: addIsLoading }] =
    useAddProductToCartMutation();
  const [deleteProductFromCart, { isLoading: removeIsLoading }] =
    useDeleteProductFromCartMutation();
  const hasInCart: boolean =
    cart?.lineItems.some(
      (cartItem: LineItem): boolean => cartItem.productId === product.id
    ) || false;
  const isLoading: boolean = addIsLoading || removeIsLoading;
  const addToCart = async (): Promise<void> => {
    if (!cart || hasInCart) {
      return;
    }

    try {
      const newCart: Cart = await addProductToCart({
        cartVersion: cart.version,
        cartId: cart.id,
        productId: product.id,
        quantity: 1
      }).unwrap();

      dispatch(setCart(newCart));
    } catch (error: unknown) {
      console.error(error);
    }
  };
  const removeFromCart = async () => {
    if (!cart || !hasInCart) {
      return;
    }

    const lineItem: LineItem | undefined = cart.lineItems.find(
      (lineItem: LineItem): boolean => lineItem.productId === product.id
    );

    if (!lineItem) {
      return;
    }

    try {
      const newCart: Cart = await deleteProductFromCart({
        cartId: cart.id,
        cartVersion: cart.version,
        lineItemId: lineItem.id
      }).unwrap();

      dispatch(setCart(newCart));
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Button
        text={!hasInCart ? 'Add to cart' : 'Remove from cart'}
        callback={() => {
          if (hasInCart) {
            removeFromCart();
          } else {
            addToCart();
          }
        }}
      />
    </>
  );
};

export default ToggleProductInCart;
