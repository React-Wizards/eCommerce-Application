// export type ClientBuilderType = typeof window['@commercetools/sdk-client-v2'];

export type Customer = CustomerDraft & {
    version: string,
    createdAt: string,
    createdBy?: string,
    lastModifiedAt: string,
    lastModifiedBy?: string,
}

export type CustomerDraft = {
    key?: string,
    customerNumber?: string,
    externalId?: string,
    email: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    title?: string,
    anonymousCart?: string, //CartResourceIdentifier,
    anonymousId?: string, 
    dateOfBirth?: string, //Date, date without timezone in ISO 8601 format (YYYY-MM-DD)
    companyName?: string,
    vatId?: string,
    addresses?: Array<BaseAddress>,
    defaultShippingAddress?: number,
    shippingAddresses?: Array<number>,
    defaultBillingAddress?: number,
    billingAddresses?: Array<number>,
    isEmailVerified?: boolean,
    customerGroup?: string, //CustomerGroup
    locale?: string, //String value specifying linguistic and regional preferences using the IETF language tag format, as described in BCP 47
    salutation?: string,
    stores?: Array<string>, // Array of StoreResourceIdentifier
    authenticationMode?: AuthenticationMode,
    custom?: string
}

export type CustomerPagedQueryResponse = {
    limit: number,
    offset: number,
    count: number,
    total: number,
    results: Array<Customer>,
}

export type AuthenticationMode = "Password" | "ExternalAuth";

export type CustomerGroupDraft = {
    key?: string,
    groupName: string,
    custom?: string
}
export type CustomerGroup = {
    id?: string,
    version?: string,
    key?: string,
    name?: string,
    custom?: string,
    createdAt?: string,
    createdBy?: string,
    lastModifiedAt?: string,
    lastModifiedBy?: string,
}

export type BaseAddress = {
    id?: string,
    key?: string,
    externalId?: string,
    country: CountryCode,
    title?: string,
    salutation?: string,
    firstName?: string,
    lastName?: string,
    streetName?: string,
    streetNumber?: string,
    additionalStreetInfo?: string,
    postalCode?: string,
    city?: string,
    region?: string,
    state?: string,
    company?: string,
    department?: string,
    building?: string,
    apartment?: string,
    pOBox?: string,
    phone?: string,
    mobile?: string,
    email?: string,
    fax?: string,
    additionalAddressInfo?: string,
    custom?: string,
}


export enum  CountryCode {
    Belarus = "BY",
    Germany = "DE",
    Russia = "RU",
    Kazakhstan = "KZ",
    USA = "US"
}