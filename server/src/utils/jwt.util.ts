import jwt from 'jsonwebtoken';
import config from 'config';

const publicJWTKey = config.get<string>('publicKey');
const privateJWTKey = config.get<string>('privateKey');

/**
 * @define create custom method for create token
 * @param payload
 * @param options
 */
export const signJWT = (
  payload: Object,
  options?: jwt.SignOptions | undefined
) => {
  // match with the publicJWTKey
  return jwt.sign(payload, privateJWTKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

/**
 * @define get user info from valid token
 * @param token
 */
export const verifyJWT = (token: string) => {
  try {
    // match with the privateJWTKey
    const decoded = jwt.verify(token, publicJWTKey);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null
    };
  }
};
