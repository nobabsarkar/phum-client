// import { jwtDecode } from "jwt-decode";

// export const verifyToken = (token: string) => {
//   return jwtDecode(token);
// };

import { jwtDecode } from "jwt-decode";

// Define your custom type
export type TDecodedUser = {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

export const verifyToken = (token: string): TDecodedUser => {
  return jwtDecode<TDecodedUser>(token);
};
