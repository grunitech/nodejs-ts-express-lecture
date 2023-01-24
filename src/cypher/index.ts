import { createCipheriv, createDecipheriv, randomFillSync, scryptSync } from 'node:crypto';

const ALG = 'aes-192-cbc';
const KEY_LEN = 24;
const INPUT_ENC = 'utf8';
const OUTPUT_ENC = 'hex';

const uint2hex = (u: Uint8Array) => Buffer.from(u).toString(OUTPUT_ENC);
const hex2uint = (h: string) => Uint8Array.from(Buffer.from(h, OUTPUT_ENC));

export class Cypher {
  private readonly key: Buffer;

  constructor(password: string, salt: string) {
    this.key = scryptSync(password, salt, KEY_LEN);
  }

  enc(data: string) {
    const iv = randomFillSync(new Uint8Array(16));
    const cipher = createCipheriv(ALG, this.key, iv);
    const encrypted = cipher.update(data, INPUT_ENC, OUTPUT_ENC) + cipher.final(OUTPUT_ENC);
    return `${encrypted}.${uint2hex(iv)}`;
  }

  dec(data: string) {
    const [encrypted, iv] = data.split('.');
    const decipher = createDecipheriv(ALG, this.key, hex2uint(iv));
    return decipher.update(encrypted, OUTPUT_ENC, INPUT_ENC) + decipher.final(INPUT_ENC);
  }
}

const cypher = new Cypher('password', 'salt');
const enc = cypher.enc('some text');
console.log('encrypted', enc);
const dec = cypher.dec(enc);
console.log('decrypted', dec);
