import jwt from 'jsonwebtoken';
import config from 'config';

const publicJWTKey = config.get<string>('publicKey');
const privateJWTKey = config.get<string>('privateKey');

export const signJWT = async (
  payload: Object,
  options?: jwt.SignOptions | undefined
) => {
  // match with the publicJWTKey
  return jwt.sign(payload, privateJWTKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

export const verifyJWT = async (token: string) => {
  try {
    // match with the privateJWTKey
    const decoded = jwt.verify(token, publicJWTKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired already',
      decoded: null
    };
  }
};
