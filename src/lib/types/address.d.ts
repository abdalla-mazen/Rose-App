export interface ShippingAddress {
  _id?: string;
  street: string;
  phone: string;
  city: string;
  lat?: string;
  long?: string;
  username?: string;
}

export interface AddressPayload {
  shippingAddress: ShippingAddress;
}

export interface GetAddressesResponse {
  message: string;
  addresses: ShippingAddress[];
}
