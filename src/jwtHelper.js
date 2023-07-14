import { Buffer } from "buffer";

const parseJwt = token => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], 'base64'));
  } catch (e) {
    return null;
  }
};

export const isValidToken = accessToken => {
  if (accessToken) {
    const decodedJwt = parseJwt(accessToken);
    if (decodedJwt.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  }
  return false;
}

export const isAdmin = accessToken => {
  if (accessToken) {
    const decodedJwt = parseJwt(accessToken);
    return decodedJwt.scope.includes("ADMIN");
  }
  return false;
}
