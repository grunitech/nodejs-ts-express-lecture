import getUserService from '../services/users-service';
import { createJWT, sign, verify } from '../services/auth-service';

export interface Credentials {
    email: string;
    password: string;
}

// the user get a token contain data

export async function login({email, password}: Credentials): Promise<string | null> {
    try {
        const user = await getUserService().byEmail(email);
        const verified = await verify(user.password, password);
        return verified ? createJWT({email: user.email, fname: user.fname}) : null;
    } catch (e) {
        return null;
    }
}

// example "one-liner" of the above "login" function
const anotherLogin = ({email, password}: Credentials) => getUserService()
    .byEmail(email)
    .then(user => verify(user.password, password))
    .catch(() => false);
