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
};
