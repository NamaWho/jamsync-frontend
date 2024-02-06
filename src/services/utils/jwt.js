import { jwtDecode } from "jwt-decode";

export const decodeJWT = (token) => {
  // Decode the JWT
  let decoded = jwtDecode(token);
  return decoded;
};
