<<<<<<< HEAD
export type AuthResponse = {
  token: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    photo: string;
    wishlist: [];
    addresses: [];
    role: string;
    isVerified: boolean;
    accessToken: string;
  } & DatabaseProperties;
=======
declare type Address = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
};

declare type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  //  Fixx : will get updated later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wishlist: any[];
  addresses: Address[];
  createdAt: string;
};

declare type LoginResponse = {
  token: string;
  user: UserData;
>>>>>>> 4dce1f56a92ed36b9ee01a99d57222640b15af40
};
