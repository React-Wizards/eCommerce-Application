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
) {
  const prices: Price[] | undefined = product.masterVariant.prices;
  return prices?.filter(
    (price: Price) => price.value.currencyCode == currencyCode
  )[0];
}

export const formatPriceString = (priceValue?: priceValueType) => {
  if (!priceValue) return null;
  return `${currencySign[priceValue.currencyCode]} ${(
    priceValue.centAmount /
    10 ** priceValue.fractionDigits
  ).toFixed(priceValue.fractionDigits)}`;
};

export function getDiscountFromPrice(price?: Price) {
  return price
    ? price.discounted
      ? Math.round(
          ((price.value.centAmount - price.discounted.value.centAmount) /
            price.value.centAmount) *
            100
        )
      : 0
    : 0;
}
