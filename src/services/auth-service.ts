import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const MY_JWT_KEY = process.env.JWT_TOKEN || 'shhhh dont tell anybody';

export function createJWT(data: object): string {
  return jwt.sign(data, MY_JWT_KEY);
}

export function verifyJWT<T = JwtPayload>(token: string): T {
  return jwt.verify(token, MY_JWT_KEY) as T;
}

/**
 * One way encrypt (signing) -> takes plain password and
 * return encrypted version with META DATA
 *
 * @param password
 */
export function sign(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Takes encrypted password with META DATA (the output of "sign")
 * and compare it to plain text password
 *
 * @param encrypted
 * @param password
 */
export function verify(encrypted: string, password: string): Promise<boolean> {
  return bcrypt.compare(password, encrypted);
}
