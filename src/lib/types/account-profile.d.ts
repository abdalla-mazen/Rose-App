export type AccountProfile = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: string[];
  addresses: Address[];
} & DatabaseProperties;
