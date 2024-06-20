import {
  formatPriceString,
  getDiscountFromPrice,
  getPriceFromProduct,
  priceValueType
} from '@/shared/utils';
import {
  Price,
  ProductProjection,
  TypedMoney
} from '@commercetools/platform-sdk';

const priceValue: priceValueType = {
  centAmount: 22900,
  currencyCode: 'USD',
  fractionDigits: 2,
  type: 'centPrecision'
};

const discountedPriceValue: priceValueType = {
  centAmount: 19923,
  currencyCode: 'USD',
  fractionDigits: 2,
  type: 'centPrecision'
};

const price1: Price = {
  id: '1',
  key: '01-EUR',
  value: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 1900,
    fractionDigits: 2
  }
};

const price2: Price = {
  id: '2',
  key: '02-USD',
  value: priceValue as TypedMoney
};

const discountedPrice: Price = {
  ...price2,
  ...{
    discounted: {
      discount: {
        id: '',
        typeId: 'product-discount'
      },
      value: discountedPriceValue as TypedMoney
    }
  }
};

const testProduct: ProductProjection = {
  categories: [],
  categoryOrderHints: {},
  createdAt: '',
  description: {},
  hasStagedChanges: false,
  id: '',
  key: '',
  lastModifiedAt: '',
  masterVariant: {
    assets: [],
    attributes: [],
    id: 1,
    images: [],
    key: '',
    prices: [price1, price2],
    sku: ''
  },
  metaDescription: {},
  metaTitle: {},
  name: {},
  priceMode: '',
  productType: {
    typeId: 'product-type',
    id: ''
  },
  published: true,
  searchKeywords: {},
  slug: {},
  taxCategory: {
    typeId: 'tax-category',
    id: ''
  },
  variants: [],
  version: 1
};

describe('getPriceFromProduct', () => {
  it('should return price value from product', async () => {
    const priseFromProduct = await getPriceFromProduct(testProduct, 'USD');
    expect(priseFromProduct).toStrictEqual(price2);
  });
});

describe('getPriceFromProduct', () => {
  it('should return formatted price string from price value', async () => {
    const formattedPrice = formatPriceString(priceValue);
    expect(formattedPrice).toBe('$229.00');
  });

  it('should return null if price value is not set', async () => {
    expect(formatPriceString()).toBe(null);
  });
});

describe('getDiscountFromPrice', () => {
  it('should return discount value from Price', async () => {
    expect(getDiscountFromPrice(discountedPrice)).toBe(13);
  });

  it('should return zero if Price has no discount', async () => {
    expect(getDiscountFromPrice(price2)).toBe(0);
  });

  it('should return zero if Price is undefined', async () => {
    expect(getDiscountFromPrice()).toBe(0);
  });
});
