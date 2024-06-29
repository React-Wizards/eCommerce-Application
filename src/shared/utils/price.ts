import { Price, ProductProjection } from '@commercetools/platform-sdk';

const currencySign: { [key: string]: string } = {
  EUR: '€',
  USD: '$',
  RUB: '₽'
};

export type priceValueType = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

export function getPriceFromProduct(
  product: ProductProjection,
  currencyCode: string
): Price | undefined {
  return product.masterVariant.prices?.find(
    (price: Price) => price.value.currencyCode == currencyCode
  );
}

export const formatPriceString = (
  priceValue?: priceValueType
): string | null => {
  if (!priceValue) {
    return null;
  }

  return `${currencySign[priceValue.currencyCode]}${(
    priceValue.centAmount /
    10 ** priceValue.fractionDigits
  ).toFixed(priceValue.fractionDigits)}`;
};

export function getDiscountFromPrice(price?: Price): number {
  if (!price || !price.discounted) {
    return 0;
  }

  return Math.round(
    ((price.value.centAmount - price.discounted.value.centAmount) /
      price.value.centAmount) *
      100
  );
}
