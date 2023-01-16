import bcrypt from 'bcrypt';

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
