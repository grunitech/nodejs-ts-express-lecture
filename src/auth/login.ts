import getUserService from '../services/users-service';
import { verify } from '../services/auth-service';

export interface Credentials {
    email: string;
    password: string;
}


export async function login({email, password}: Credentials): Promise<boolean> {
    try {
        const user = await getUserService().byEmail(email);
        return verify(user.password, password);
    } catch (e) {
        return false;
    }
}

// example "one-liner" of the above "login" function
const anotherLogin = ({email, password}: Credentials) => getUserService()
    .byEmail(email)
    .then(user => verify(user.password, password))
    .catch(() => false);
