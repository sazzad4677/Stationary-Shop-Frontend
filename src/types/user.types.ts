export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  shippingAddress: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  },
}

export type TUserGetApiResponse = TUser & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TLoggedInUser = {
  _id: string,
  role: string,
  name: string,
  email: string,
  isShippingAddressAdded: boolean,
  iat: number,
  exp: number,
}
