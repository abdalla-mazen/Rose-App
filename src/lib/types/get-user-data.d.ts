declare type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: string[];
  addresses: string[];
} & DatabaseProperties;
