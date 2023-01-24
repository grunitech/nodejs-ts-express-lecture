import getUserService from '../services/users-service';
import { verify } from '../services/auth-service';
import { OAuth2Client } from 'google-auth-library';

export interface Credentials {
  email: string;
  password: string;
}

// the user get a token contain data

export async function login({ email, password }: Credentials): Promise<boolean> {
  const user = await getUserService().byEmail(email);
  const verified = await verify(user.password, password);
  return verified;
}

const google_client_id = '100350147102-n01o57le5j3jq8pd981ne6uefvot2343.apps.googleusercontent.com';

export async function googleLogin(idToken: string) {
  const auth = new OAuth2Client(google_client_id);
  return auth.verifyIdToken({ idToken }) as Promise<any>;
}

// example "one-liner" of the above "login" function
const anotherLogin = ({ email, password }: Credentials) =>
  getUserService()
    .byEmail(email)
    .then((user) => verify(user.password, password))
    .catch(() => false);
