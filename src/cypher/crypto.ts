import { randomFill as cbRandomFill, scrypt as cbScrypt } from 'node:crypto';
import { promisify } from 'node:util';

export const scrypt = promisify(cbScrypt);
export const randomFill = promisify(cbRandomFill);
